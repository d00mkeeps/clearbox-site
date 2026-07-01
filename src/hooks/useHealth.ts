import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchHealth } from '../services/api';
import type { HealthResponse } from '../types/telemetry';

const POLL_INTERVAL_MS = 30_000; // 30s

export interface HealthState {
  data: HealthResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useHealth(): HealthState {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    try {
      const result = await fetchHealth();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'fetch failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    intervalRef.current = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [load]);

  return { data, loading, error, refetch: load };
}
