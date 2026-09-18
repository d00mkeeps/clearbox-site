import type Highcharts from 'highcharts';
import HighchartsWrapper from '../HighchartsWrapper';
import { HealthPanel } from '../HealthPanel';
import { ErrorTable } from '../ErrorTable';
import type { SystemData } from '../../../types/analytics';

interface DiagnosticsTabProps {
  data?: SystemData;
}

export function DiagnosticsTab({ data }: DiagnosticsTabProps) {
  // Error Type Distribution
  const errorTypeOptions: Highcharts.Options = {
    chart: { type: 'pie', height: 260 },
    title: { text: 'Client Error Categories' },
    plotOptions: {
      pie: {
        innerSize: '50%',
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y}',
          style: {
            color: '#f5f5f7',
            fontSize: '11px',
            textOutline: 'none',
          },
        },
      },
    },
    series: [
      {
        name: 'Errors',
        type: 'pie',
        data: data?.error_type_distribution || [
          { name: 'js_exception', y: 4 },
          { name: 'api_failure', y: 1 },
        ],
      },
    ],
  };

  // OS Version Breakdown
  const osOptions: Highcharts.Options = {
    chart: { type: 'column', height: 260 },
    title: { text: 'Client Operating Systems' },
    xAxis: {
      categories: (data?.os_breakdown || [{ name: 'iOS 18.2', y: 19 }, { name: 'iOS 18.0', y: 8 }]).map((x) => x.name),
    },
    yAxis: {
      title: { text: 'Sessions' },
      min: 0,
    },
    legend: { enabled: false },
    series: [
      {
        name: 'Devices',
        type: 'column',
        data: (data?.os_breakdown || [{ name: 'iOS 18.2', y: 19 }, { name: 'iOS 18.0', y: 8 }]).map((x) => x.y),
        color: '#64d2ff',
      },
    ],
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <HealthPanel />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
        <div className="card" style={{ padding: 16 }}>
          <HighchartsWrapper options={errorTypeOptions} />
        </div>
        <div className="card" style={{ padding: 16 }}>
          <HighchartsWrapper options={osOptions} />
        </div>
      </div>

      <ErrorTable />
    </div>
  );
}
