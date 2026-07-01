import { useEffect } from 'react';
import { HealthPanel } from '../../components/admin/HealthPanel';
import { ErrorTable } from '../../components/admin/ErrorTable';

export default function DashboardScreen() {
  // Poll errors on mount and every 30s
  useEffect(() => {
    document.title = 'Admin — Clear Box';
  }, []);

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1>Clear Box</h1>
          <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>/ admin</span>
        </div>
        <span className="badge">v1 — telemetry</span>
      </header>

      <main className="admin-main">
        <HealthPanel />
        <ErrorTable />
      </main>
    </div>
  );
}
