import type { TelemetryError } from '../../types/telemetry';

interface Props {
  error: TelemetryError;
  onClose: () => void;
}

const ERROR_TYPE_LABELS: Record<string, string> = {
  js_exception: 'JS Exception',
  unhandled_rejection: 'Unhandled Rejection',
  api_failure: 'API Failure',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}

export function ErrorDetailModal({ error, onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className={`error-type-badge ${error.error_type}`} style={{ marginRight: 8 }}>
              {ERROR_TYPE_LABELS[error.error_type] ?? error.error_type}
            </span>
          </div>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>

        <div className="modal-body">
          <div className="meta-grid">
            <div className="meta-item">
              <label>Session ID</label>
              <span>{error.session_id}</span>
            </div>
            <div className="meta-item">
              <label>Error ID</label>
              <span>{error.id}</span>
            </div>
            <div className="meta-item">
              <label>App Version</label>
              <span>{error.app_version}</span>
            </div>
            <div className="meta-item">
              <label>OS</label>
              <span>{error.os_version}</span>
            </div>
            <div className="meta-item">
              <label>Device</label>
              <span>{error.device_model}</span>
            </div>
            <div className="meta-item">
              <label>Timestamp</label>
              <span>{formatDate(error.created_at)}</span>
            </div>
          </div>

          <p className="section-label">Message</p>
          <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
            {error.message}
          </p>

          {error.stack_trace && (
            <>
              <p className="section-label">Stack Trace</p>
              <div className="stack-trace">{error.stack_trace}</div>
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
