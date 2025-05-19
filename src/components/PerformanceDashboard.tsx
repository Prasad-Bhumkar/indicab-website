import { Card } from '@/components/ui/card';
import { performanceMonitor } from '@/utils/performance';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

interface MetricData {
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

export const PerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Record<string, MetricData[]>>({});
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d'>('1h');

  useEffect(() => {
    const updateMetrics = () => {
      const allMetrics = performanceMonitor.getMetrics();
      const groupedMetrics = allMetrics.reduce((acc, metric) => {
        if (!acc[metric.name]) {
          acc[metric.name] = [];
        }
        acc[metric.name].push(metric);
        return acc;
      }, {} as Record<string, MetricData[]>);

      setMetrics(groupedMetrics);
    };

    const interval = setInterval(updateMetrics, 5000);
    updateMetrics();

    return () => clearInterval(interval);
  }, []);

  const getTimeFilteredMetrics = (metricData: MetricData[]) => {
    const now = Date.now();
    const timeRanges = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
    };

    return metricData.filter(
      metric => now - metric.timestamp <= timeRanges[timeRange]
    );
  };

  const formatMetricValue = (value: number) => {
    return value.toFixed(2);
  };

  const getMetricColor = (metricName: string) => {
    const colors: Record<string, string> = {
      'lcp': '#FF6B6B',
      'fid': '#4ECDC4',
      'cls': '#45B7D1',
      'page-load': '#96CEB4',
      'api': '#FFEEAD',
    };
    return colors[metricName] || '#8884d8';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Performance Dashboard</h1>
        <div className="space-x-2">
          <button
            onClick={() => setTimeRange('1h')}
            className={`px-4 py-2 rounded ${
              timeRange === '1h' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            1h
          </button>
          <button
            onClick={() => setTimeRange('24h')}
            className={`px-4 py-2 rounded ${
              timeRange === '24h' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            24h
          </button>
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-4 py-2 rounded ${
              timeRange === '7d' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            7d
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(metrics).map(([metricName, metricData]) => {
          const filteredData = getTimeFilteredMetrics(metricData);
          const latestValue = filteredData[filteredData.length - 1]?.value || 0;
          const average = filteredData.reduce((acc, m) => acc + m.value, 0) / filteredData.length || 0;

          return (
            <Card key={metricName} className="p-4">
              <h3 className="text-lg font-semibold mb-2">{metricName}</h3>
              <div className="space-y-2">
                <p>Latest: {formatMetricValue(latestValue)}</p>
                <p>Average: {formatMetricValue(average)}</p>
                <button
                  onClick={() => setSelectedMetric(metricName)}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {selectedMetric && metrics[selectedMetric] && (
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">{selectedMetric} Trend</h2>
          <LineChart
            width={800}
            height={400}
            data={getTimeFilteredMetrics(metrics[selectedMetric])}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
              formatter={(value: number) => [formatMetricValue(value), 'Value']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke={getMetricColor(selectedMetric)}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </Card>
      )}
    </div>
  );
}; 