import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchErrors, resolveError as resolveErrorApi } from '../services/api';
import type { TelemetryError, FetchErrorsParams } from '../types/telemetry';

const POLL_INTERVAL_MS = 15_000; // 15s

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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchErrors(params);
      setErrors(result.errors);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'fetch failed');
    } finally {
      setLoading(false);
    }
  }

  // Refetch when params change (filter, pagination)
  useEffect(() => {
    load();
  }, [params.limit, params.offset, params.resolved, params.error_type, params.from, params.to]);

  // Auto-poll for new errors
  useEffect(() => {
    load();
    intervalRef.current = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [load]);

  const setParams = useCallback((p: Partial<FetchErrorsParams>) => {
    setParamsState((prev) => ({ ...prev, ...p }));
  }, []);

  const resolveError = useCallback(async (id: string) => {
    await resolveErrorApi(id);
    await load(); // full refetch — keeps table in sync without a page reload
  }, [load]);

  return { errors, total, loading, error, setParams, resolveError, refetch: load };
}
