import { performanceMonitor } from '@/utils/performance';

interface AlertConfig {
  metric: string;
  threshold: number;
  condition: 'above' | 'below';
  duration: number; // in milliseconds
  severity: 'low' | 'medium' | 'high';
}

interface Alert {
  id: string;
  config: AlertConfig;
  triggered: boolean;
  lastTriggered: number;
  occurrences: number;
}

class MonitoringService {
  private alerts: Map<string, Alert> = new Map();
  private readonly metricRetentionPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days
  private readonly cleanupInterval = 60 * 60 * 1000; // 1 hour

  constructor() {
    // Start cleanup interval
    setInterval(() => this.cleanup(), this.cleanupInterval);
  }

  addAlert(config: AlertConfig) {
    const id = `${config.metric}-${config.threshold}-${config.condition}`;
    this.alerts.set(id, {
      id,
      config,
      triggered: false,
      lastTriggered: 0,
      occurrences: 0
    });
  }

  removeAlert(id: string) {
    this.alerts.delete(id);
  }

  checkAlerts() {
    const now = Date.now();
    const metrics = performanceMonitor.getMetrics();

    for (const [id, alert] of this.alerts) {
      const metricData = metrics.filter(m => m.name === alert.config.metric);
      if (metricData.length === 0) continue;

      const recentMetrics = metricData.filter(
        m => now - m.timestamp <= alert.config.duration
      );

      if (recentMetrics.length === 0) continue;

      const average = recentMetrics.reduce((sum, m) => sum + m.value, 0) / recentMetrics.length;
      const shouldTrigger = alert.config.condition === 'above' 
        ? average > alert.config.threshold
        : average < alert.config.threshold;

      if (shouldTrigger) {
        this.handleAlert(alert, average);
      } else {
        this.resetAlert(alert);
      }
    }
  }

  private handleAlert(alert: Alert, value: number) {
    const now = Date.now();
    alert.occurrences++;
    alert.lastTriggered = now;
    alert.triggered = true;

    // Log alert
    console.error(`Alert triggered: ${alert.id}`, {
      value,
      threshold: alert.config.threshold,
      occurrences: alert.occurrences,
      severity: alert.config.severity
    });

    // Send alert notification
    this.sendAlertNotification(alert, value);
  }

  private resetAlert(alert: Alert) {
    if (alert.triggered) {
      console.log(`Alert resolved: ${alert.id}`);
      alert.triggered = false;
      alert.occurrences = 0;
    }
  }

  private async sendAlertNotification(alert: Alert, value: number) {
    // Implement your notification logic here
    // This could be email, Slack, webhook, etc.
    try {
      // Example: Send to webhook
      await fetch(process.env.ALERT_WEBHOOK_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alert: alert.id,
          value,
          threshold: alert.config.threshold,
          severity: alert.config.severity,
          occurrences: alert.occurrences,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Failed to send alert notification:', error);
    }
  }

  private cleanup() {
    const now = Date.now();
    
    // Clean up old metrics
    const metrics = performanceMonitor.getMetrics();
    const recentMetrics = metrics.filter(
      m => now - m.timestamp <= this.metricRetentionPeriod
    );
    
    // Update metrics in performance monitor
    performanceMonitor.clearMetrics();
    recentMetrics.forEach(m => {
      performanceMonitor.addMetric(m);
    });

    // Clean up resolved alerts
    for (const [id, alert] of this.alerts) {
      if (!alert.triggered && now - alert.lastTriggered > 24 * 60 * 60 * 1000) {
        this.alerts.delete(id);
      }
    }
  }

  getAlertStatus() {
    return Array.from(this.alerts.values()).map(alert => ({
      id: alert.id,
      metric: alert.config.metric,
      threshold: alert.config.threshold,
      condition: alert.config.condition,
      severity: alert.config.severity,
      triggered: alert.triggered,
      lastTriggered: alert.lastTriggered,
      occurrences: alert.occurrences
    }));
  }
}

// Create singleton instance
export const monitoringService = new MonitoringService();

// Initialize default alerts
monitoringService.addAlert({
  metric: 'page-load',
  threshold: 3000, // 3 seconds
  condition: 'above',
  duration: 5 * 60 * 1000, // 5 minutes
  severity: 'high'
});

monitoringService.addAlert({
  metric: 'api',
  threshold: 1000, // 1 second
  condition: 'above',
  duration: 5 * 60 * 1000, // 5 minutes
  severity: 'medium'
});

monitoringService.addAlert({
  metric: 'error-boundary-handling',
  threshold: 5, // 5 errors
  condition: 'above',
  duration: 5 * 60 * 1000, // 5 minutes
  severity: 'high'
}); 