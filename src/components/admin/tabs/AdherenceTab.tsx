import type Highcharts from 'highcharts';
import HighchartsWrapper from '../HighchartsWrapper';
import type { AdherenceData } from '../../../types/analytics';
import { CheckCircle2, Pill, Activity, Clock } from 'lucide-react';

interface AdherenceTabProps {
  data: AdherenceData;
}

export function AdherenceTab({ data }: AdherenceTabProps) {
  const { kpis, daily_timeline, slot_distribution, top_medicines } = data;

  // 1. Daily Taken vs Skipped Stacked Column with Adherence Spline
  const dailyOptions: Highcharts.Options = {
    chart: { height: 320 },
    title: { text: 'Daily Dose Logging & Adherence (Last 30 Days)' },
    xAxis: {
      categories: daily_timeline.map((item) => item.date.slice(5)),
      tickInterval: 4,
    },
    yAxis: [
      {
        title: { text: 'Doses Logged' },
        min: 0,
      },
      {
        title: { text: 'Adherence %' },
        opposite: true,
        min: 0,
        max: 100,
        labels: { format: '{value}%' },
      },
    ],
    plotOptions: {
      column: {
        stacking: 'normal',
      },
    },
    tooltip: {
      shared: true,
    },
    series: [
      {
        name: 'Taken',
        type: 'column',
        data: daily_timeline.map((item) => item.taken),
        color: '#30d158',
      },
      {
        name: 'Skipped',
        type: 'column',
        data: daily_timeline.map((item) => item.skipped),
        color: '#ff9f0a',
      },
      {
        name: 'Adherence %',
        type: 'spline',
        yAxis: 1,
        data: daily_timeline.map((item) => item.adherence_rate),
        color: '#0a84ff',
        tooltip: { valueSuffix: '%' },
      },
    ],
  };

  // 2. Dose Time Slot Distribution (Donut Chart)
  const slotOptions: Highcharts.Options = {
    chart: { type: 'pie', height: 320 },
    title: { text: 'Dose Schedule Distribution by Slot' },
    subtitle: { text: 'Morning (0-6), Afternoon (7-13), Evening (14-20), Night (21-27)' },
    plotOptions: {
      pie: {
        innerSize: '62%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
          style: {
            color: '#f5f5f7',
            fontSize: '11px',
            textOutline: 'none',
          },
        },
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)',
    },
    series: [
      {
        name: 'Doses',
        type: 'pie',
        data: slot_distribution,
      },
    ],
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Overall Adherence</span>
            <CheckCircle2 size={16} color="#30d158" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8, color: '#30d158' }}>
            {kpis.overall_adherence_percent}%
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Logged doses marked taken</span>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Total Doses Logged</span>
            <Activity size={16} color="#0a84ff" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8, color: '#f5f5f7' }}>
            {kpis.total_doses_logged.toLocaleString()}
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Lifetime patient submissions</span>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Avg Meds / Patient</span>
            <Pill size={16} color="#bf5af2" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8, color: '#f5f5f7' }}>
            {kpis.avg_medicines_per_user}
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Active medicines in regimen</span>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>7-Day Adherence</span>
            <Clock size={16} color="#ff9f0a" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8, color: '#ff9f0a' }}>
            {kpis.adherence_7d_percent}%
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Recent 7-day index</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 20 }}>
        <div className="card" style={{ padding: 16 }}>
          <HighchartsWrapper options={dailyOptions} />
        </div>
        <div className="card" style={{ padding: 16 }}>
          <HighchartsWrapper options={slotOptions} />
        </div>
      </div>

      {/* Top Tracked Medicines */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Pill size={18} color="#0a84ff" />
          <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Most Commonly Tracked Medications</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {top_medicines.map((med, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    background: 'rgba(10, 132, 255, 0.15)',
                    color: '#0a84ff',
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {idx + 1}
                </span>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#f5f5f7' }}>{med.name}</span>
              </div>
              <span className="badge" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {med.count} {med.count === 1 ? 'patient' : 'patients'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
