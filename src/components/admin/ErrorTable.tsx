import { useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { useErrors } from '../../hooks/useErrors';
import type { TelemetryError, ErrorType } from '../../types/telemetry';
import { ErrorDetailModal } from './ErrorDetailModal';

const ERROR_TYPE_LABELS: Record<ErrorType, string> = {
  js_exception: 'JS Exception',
  unhandled_rejection: 'Unhandled Rejection',
  api_failure: 'API Failure',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
    ' ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

function ErrorChart({ errors }: { errors: TelemetryError[] }) {
  // Group by hour for last 24h
  const now = Date.now();
  const buckets: Record<string, number> = {};
  for (let i = 23; i >= 0; i--) {
    const h = new Date(now - i * 3600_000);
    const key = `${h.getMonth() + 1}/${h.getDate()} ${h.getHours().toString().padStart(2, '0')}:00`;
    buckets[key] = 0;
  }
  for (const e of errors) {
    const d = new Date(e.created_at);
    const key = `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:00`;
    if (key in buckets) buckets[key]++;
  }
  const data = Object.entries(buckets).map(([x, y]) => ({ x, y }));

  return (
    <div style={{ height: 100, marginBottom: 16 }}>
      <VictoryChart height={100} padding={{ top: 8, bottom: 32, left: 40, right: 16 }}>
        <VictoryAxis
          tickFormat={(t) => {
            const [_, hour] = t.split(' ');
            return hour;
          }}
          style={{
            axis: { stroke: 'var(--border)' },
            tickLabels: { fill: 'var(--text-muted)', fontSize: 9, fontFamily: 'var(--font-mono)' },
          }}
          tickCount={6}
        />
        <VictoryAxis
          tickFormat={(t) => (t === 0 ? '' : String(t))}
          style={{
            axis: { stroke: 'var(--border)' },
            tickLabels: { fill: 'var(--text-muted)', fontSize: 9 },
          }}
        />
        <VictoryBar
          data={data}
          style={{
            data: { fill: 'var(--accent)', opacity: 0.8 },
          }}
          animate={{ duration: 300 }}
        />
      </VictoryChart>
    </div>
  );
}

export function ErrorTable() {
  const { errors, total, loading, error, setParams, resolveError } = useErrors();
  const [selected, setSelected] = useState<TelemetryError | null>(null);
  const [filterType, setFilterType] = useState<ErrorType | ''>('');

  function handleFilterType(type: ErrorType | '') {
    setFilterType(type);
    setParams({ error_type: type || undefined });
  }

  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h2>Client Errors</h2>
          {total > 0 && (
            <span className="badge">{total} unresolved</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['', 'js_exception', 'unhandled_rejection', 'api_failure'] as const).map((type) => (
            <button
              key={type || 'all'}
              className={`btn ${filterType === type ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => handleFilterType(type)}
            >
              {type === '' ? 'All' : ERROR_TYPE_LABELS[type].split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="card-body" style={{ padding: 0 }}>
        {error && (
          <div style={{ padding: 16 }}>
            <div className="error-state">{error}</div>
          </div>
        )}

        {!error && loading && errors.length === 0 && (
          <div className="loading-row"><div className="spinner" />Loading…</div>
        )}

        {!error && !loading && errors.length === 0 && (
          <div className="empty-state">
            <p>No errors match this filter</p>
          </div>
        )}

        {errors.length > 0 && <ErrorChart errors={errors} />}

        {errors.length > 0 && (
          <div className="error-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Message</th>
                  <th>Device</th>
                  <th>App</th>
                  <th>Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {errors.map((err) => (
                  <tr key={err.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(err)}>
                    <td>
                      <span className={`error-type-badge ${err.error_type}`}>
                        {ERROR_TYPE_LABELS[err.error_type]}
                      </span>
                    </td>
                    <td>
                      <span className="error-message" title={err.message}>
                        {err.message}
                      </span>
                    </td>
                    <td className="error-meta">{err.device_model}</td>
                    <td className="error-meta">{err.app_version}</td>
                    <td className="timestamp">{formatDate(err.created_at)}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="error-actions">
                        <button
                          className="btn btn-primary"
                          onClick={() => setSelected(err)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-ghost"
                          onClick={() => resolveError(err.id)}
                        >
                          Resolve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <ErrorDetailModal error={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
