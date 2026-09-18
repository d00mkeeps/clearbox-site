import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Clear Box Dark Theme for Highcharts
const clearBoxDarkTheme: Highcharts.Options = {
  chart: {
    backgroundColor: 'transparent',
    style: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", system-ui, sans-serif',
    },
  },
  title: {
    style: {
      color: '#f5f5f7',
      fontWeight: '600',
      fontSize: '14px',
      letterSpacing: '-0.01em',
    },
    align: 'left',
  },
  subtitle: {
    style: {
      color: '#86868b',
      fontSize: '12px',
    },
    align: 'left',
  },
  xAxis: {
    gridLineColor: 'rgba(255, 255, 255, 0.05)',
    lineColor: 'rgba(255, 255, 255, 0.1)',
    tickColor: 'rgba(255, 255, 255, 0.1)',
    labels: {
      style: {
        color: '#86868b',
        fontSize: '11px',
      },
    },
  },
  yAxis: {
    gridLineColor: 'rgba(255, 255, 255, 0.06)',
    title: {
      style: {
        color: '#86868b',
        fontSize: '11px',
      },
    },
    labels: {
      style: {
        color: '#86868b',
        fontSize: '11px',
      },
    },
  },
  tooltip: {
    backgroundColor: 'rgba(28, 28, 30, 0.96)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    shadow: true,
    style: {
      color: '#f5f5f7',
      fontSize: '12px',
    },
  },
  legend: {
    itemStyle: {
      color: '#a1a1a6',
      fontWeight: '500',
      fontSize: '12px',
    },
    itemHoverStyle: {
      color: '#ffffff',
    },
  },
  credits: {
    enabled: false,
  },
  colors: ['#0a84ff', '#30d158', '#ff9f0a', '#bf5af2', '#ff453a', '#64d2ff'],
};

if (typeof window !== 'undefined') {
  Highcharts.setOptions(clearBoxDarkTheme);
}

export default function HighchartsWrapper(props: HighchartsReact.Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 12, color: 'var(--text-muted)', fontSize: 12 }}>
        Loading chart...
      </div>
    );
  }

  return <HighchartsReact highcharts={Highcharts} {...props} />;
}
