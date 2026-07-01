import { useHealth } from '../../hooks/useHealth';

function formatLatency(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function DbUsageMeter({ current, max }: { current: number; max: number }) {
  const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0;
  const color =
    pct > 80 ? 'var(--danger)' : pct > 60 ? 'var(--warning)' : 'var(--success)';
  return (
    <div className="metric-card">
      <div className="metric-label">DB Connections</div>
      <div className="metric-value" style={{ color }}>{current}</div>
      <div className="metric-sub">{pct.toFixed(0)}% of {max}</div>
      <div style={{ marginTop: 8, height: 4, background: 'var(--bg-primary)', borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value" style={color ? { color } : undefined}>{value}</div>
      {sub && <div className="metric-sub">{sub}</div>}
    </div>
  );
}

export function HealthPanel() {
  const { data, loading, error, refetch } = useHealth();

  return (
    <div className="card">
      <div className="card-header">
        <h2>System Health</h2>
        <button className="btn btn-ghost" onClick={refetch} disabled={loading}>
          {loading ? 'Polling…' : 'Refresh'}
        </button>
      </div>
      <div className="card-body">
        {error && <div className="error-state">Health check failed: {error}</div>}
        {!error && loading && !data && (
          <div className="loading-row"><div className="spinner" />Loading…</div>
        )}
        {data && (
          <div className="health-grid">
            <DbUsageMeter current={data.db_connections} max={data.db_connection_limit} />
            <MetricCard
              label="API Latency"
              value={formatLatency(data.api_latency_ms)}
              color={
                data.api_latency_ms > 500
                  ? 'var(--danger)'
                  : data.api_latency_ms > 200
                    ? 'var(--warning)'
                    : 'var(--success)'
              }
            />
            <MetricCard
              label="Error Rate (5m)"
              value={`${(data.error_rate_5m * 100).toFixed(1)}%`}
              color={
                data.error_rate_5m > 0.05
                  ? 'var(--danger)'
                  : data.error_rate_5m > 0.01
                    ? 'var(--warning)'
                    : 'var(--success)'
              }
            />
            <MetricCard
              label="Checked"
              value={new Date(data.timestamp).toLocaleTimeString()}
              sub={new Date(data.timestamp).toLocaleDateString()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
