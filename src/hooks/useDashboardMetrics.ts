import { useState, useEffect, useCallback } from 'react';
import { fetchDashboardMetrics, refreshDashboardMetrics } from '../services/api';
import type { DashboardMetricsResponse } from '../types/analytics';

export function useDashboardMetrics() {
  const [data, setData] = useState<DashboardMetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchDashboardMetrics();
      setData(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard metrics');
    } finally {
      setLoading(false);
    }
  }, []);

  const triggerRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await refreshDashboardMetrics();
      setData(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to refresh metrics');
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  return {
    data,
    loading,
    refreshing,
    error,
    refresh: triggerRefresh,
    reload: loadMetrics,
  };
}
