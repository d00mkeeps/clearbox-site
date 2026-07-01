import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchErrors, resolveError as resolveErrorApi } from '../services/api';
import type { TelemetryError, FetchErrorsParams } from '../types/telemetry';

const POLL_INTERVAL_MS = 30_000; // 30s

export function useErrors(initialParams: FetchErrorsParams = {}): {
  errors: TelemetryError[];
  total: number;
  loading: boolean;
  error: string | null;
  setParams: (p: Partial<FetchErrorsParams>) => void;
  resolveError: (id: string) => Promise<void>;
  refetch: () => void;
} {
  const [params, setParamsState] = useState<FetchErrorsParams>({
    limit: 50,
    resolved: false,
    ...initialParams,
  });
  const [errors, setErrors] = useState<TelemetryError[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Keep a ref to the latest params so load() always reads current values
  // without needing params in its dependency array
  const paramsRef = useRef(params);
  paramsRef.current = params;

  // Cancel in-flight request on new params or unmount
  const abortRef = useRef<AbortController | null>(null);

  // Deduplicate concurrent load() calls — return the same promise
  const inFlightRef = useRef<Promise<void> | null>(null);

  const load = useCallback(async () => {
    // Cancel any in-flight request for the same hook instance
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    // If a load is already running, wait for it instead of starting a new one
    if (inFlightRef.current) {
      return inFlightRef.current;
    }

    const loadPromise = (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchErrors(paramsRef.current);
        setErrors(result.errors);
        setTotal(result.total);
      } catch (err) {
        // Ignore abort errors — they're expected when cancelling stale requests
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'fetch failed');
      } finally {
        setLoading(false);
        inFlightRef.current = null;
      }
    })();

    inFlightRef.current = loadPromise;
    return loadPromise;
  }, []); // load is stable — paramsRef always has current value

  // Refetch when params change (filter, pagination)
  useEffect(() => {
    load();
  }, [params.limit, params.offset, params.resolved, params.error_type, params.from, params.to]);

  // Auto-poll for new errors
  useEffect(() => {
    const tick = () => load();
    tick(); // immediate fetch on mount
    const id = setInterval(tick, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []); // load is stable, no deps needed

  const setParams = useCallback((p: Partial<FetchErrorsParams>) => {
    setParamsState((prev) => ({ ...prev, ...p }));
  }, []);

  const resolveError = useCallback(async (id: string) => {
    await resolveErrorApi(id);
    await load();
  }, [load]);

  return { errors, total, loading, error, setParams, resolveError, refetch: load };
}