import type Highcharts from 'highcharts';
import HighchartsWrapper from '../HighchartsWrapper';
import type { RetentionData } from '../../../types/analytics';
import { Users, UserCheck, Calendar, TrendingUp } from 'lucide-react';

interface RetentionTabProps {
  data: RetentionData;
}

export function RetentionTab({ data }: RetentionTabProps) {
  const { kpis, growth_timeline, cohort_retention } = data;

  // 1. Daily Active Patients & Growth Spline
  const activityOptions: Highcharts.Options = {
    chart: { type: 'spline', height: 320 },
    title: { text: 'Daily Active Patients & Signups (Last 30 Days)' },
    xAxis: {
      categories: growth_timeline.map((item) => item.date.slice(5)),
      tickInterval: 4,
    },
    yAxis: [
      {
        title: { text: 'Active Patients (DAU)' },
        min: 0,
      },
      {
        title: { text: 'Cumulative Total' },
        opposite: true,
        min: 0,
      },
    ],
    tooltip: {
      shared: true,
    },
    series: [
      {
        name: 'Daily Active (DAU)',
        type: 'spline',
        data: growth_timeline.map((item) => item.active_users),
        color: '#0a84ff',
      },
      {
        name: 'New Signups',
        type: 'column',
        data: growth_timeline.map((item) => item.new_users),
        color: '#30d158',
      },
      {
        name: 'Total Accounts',
        type: 'spline',
        yAxis: 1,
        dashStyle: 'ShortDash',
        data: growth_timeline.map((item) => item.cumulative_users),
        color: '#86868b',
      },
    ],
  };

  // 2. Cohort Retention Curves
  const weeks = ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const cohortSeries = cohort_retention.map((c, idx) => {
    const palette = ['#0a84ff', '#30d158', '#bf5af2', '#ff9f0a', '#64d2ff'];
    return {
      name: `${c.cohort_week} (n=${c.user_count})`,
      type: 'line' as const,
      data: c.retention,
      color: palette[idx % palette.length],
      marker: { enabled: true, radius: 4 },
    };
  });

  const cohortOptions: Highcharts.Options = {
    chart: { type: 'line', height: 320 },
    title: { text: 'Weekly Retention Rate by Cohort' },
    subtitle: { text: '% of users logging at least one medication per subsequent week' },
    xAxis: {
      categories: weeks,
    },
    yAxis: {
      title: { text: 'Retention %' },
      min: 0,
      max: 100,
      labels: { format: '{value}%' },
    },
    tooltip: {
      valueSuffix: '%',
    },
    series: cohortSeries,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Registered Accounts</span>
            <Users size={16} color="#0a84ff" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8, color: '#f5f5f7' }}>
            {kpis.total_registered_users.toLocaleString()}
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Total app profiles</span>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>30-Day Active</span>
            <UserCheck size={16} color="#30d158" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8, color: '#30d158' }}>
            {kpis.active_users_30d.toLocaleString()}
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Logged in last 30 days</span>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Day 7 Retention</span>
            <Calendar size={16} color="#ff9f0a" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8, color: '#f5f5f7' }}>
            {kpis.day_7_retention_percent}%
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>1-week return rate</span>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Day 30 Retention</span>
            <TrendingUp size={16} color="#bf5af2" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8, color: '#f5f5f7' }}>
            {kpis.day_30_retention_percent}%
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Long-term adherence retention</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 20 }}>
        <div className="card" style={{ padding: 16 }}>
          <HighchartsWrapper options={activityOptions} />
        </div>
        <div className="card" style={{ padding: 16 }}>
          <HighchartsWrapper options={cohortOptions} />
        </div>
      </div>
    </div>
  );
}
