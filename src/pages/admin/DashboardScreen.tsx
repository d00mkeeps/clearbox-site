import { useState, useEffect } from 'react';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';
import { RetentionTab } from '../../components/admin/tabs/RetentionTab';
import { AdherenceTab } from '../../components/admin/tabs/AdherenceTab';
import { DiagnosticsTab } from '../../components/admin/tabs/DiagnosticsTab';
import { TrendingUp, Pill, Activity, RefreshCw } from 'lucide-react';

type TabType = 'retention' | 'adherence' | 'diagnostics';

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('retention');
  const { data, loading, refreshing, error, refresh, reload } = useDashboardMetrics();

  useEffect(() => {
    document.title = 'Admin — Clear Box';
  }, []);

  return (
    <div className="admin-layout">
      <header className="admin-header" style={{ flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1>Clear Box</h1>
          <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>/ admin</span>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: 8, background: 'rgba(255, 255, 255, 0.04)', padding: 4, borderRadius: 10, border: '1px solid var(--border)' }}>
          <button
            className={`btn ${activeTab === 'retention' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', fontSize: 13 }}
            onClick={() => setActiveTab('retention')}
          >
            <TrendingUp size={14} />
            Retention & Growth
          </button>
          <button
            className={`btn ${activeTab === 'adherence' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', fontSize: 13 }}
            onClick={() => setActiveTab('adherence')}
          >
            <Pill size={14} />
            Adherence & Doses
          </button>
          <button
            className={`btn ${activeTab === 'diagnostics' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', fontSize: 13 }}
            onClick={() => setActiveTab('diagnostics')}
          >
            <Activity size={14} />
            Diagnostics & System
          </button>
        </div>

        {/* Controls: DB Status Pill & Refresh Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
          {data?.overview && (
            <span
              className="badge"
              style={{
                background: data.overview.db_status === 'live' ? 'rgba(48, 209, 88, 0.15)' : 'rgba(255, 159, 10, 0.15)',
                color: data.overview.db_status === 'live' ? '#30d158' : '#ff9f0a',
                border: `1px solid ${data.overview.db_status === 'live' ? 'rgba(48, 209, 88, 0.3)' : 'rgba(255, 159, 10, 0.3)'}`,
              }}
            >
              {data.overview.db_status.toUpperCase()}
            </span>
          )}

          <button
            className="btn btn-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px' }}
            onClick={refresh}
            disabled={refreshing || loading}
          >
            <RefreshCw size={14} className={refreshing ? 'spinner' : ''} />
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </header>

      <main className="admin-main">
        {loading && !data && (
          <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
            <div className="spinner" style={{ margin: '0 auto 12px' }} />
            Loading analytics metrics...
          </div>
        )}

        {error && !data && (
          <div className="card" style={{ padding: 32, textAlign: 'center' }}>
            <div style={{ color: 'var(--danger)', marginBottom: 12 }}>Failed to load metrics: {error}</div>
            <button className="btn btn-primary" onClick={reload}>Retry</button>
          </div>
        )}

        {data && (
          <>
            {activeTab === 'retention' && <RetentionTab data={data.retention} />}
            {activeTab === 'adherence' && <AdherenceTab data={data.adherence} />}
            {activeTab === 'diagnostics' && <DiagnosticsTab data={data.system} />}
          </>
        )}
      </main>
    </div>
  );
}
