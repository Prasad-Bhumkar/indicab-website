# Sentry Monitoring and Error Tracking Configuration for IndiCab

This document provides comprehensive guidance on configuring Sentry for error tracking, performance monitoring, and alerting in the IndiCab application.

## Initial Setup

### Installation and Configuration

```typescript
// next.config.mjs
const nextConfig = {
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: false,
    disableClientWebpackPlugin: false,
  }
};

// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.5,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
```

## Error Tracking

### Error Boundaries

```typescript
import * as Sentry from '@sentry/nextjs';

class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      scope.setTag('component', 'ErrorBoundary');
      Sentry.captureException(error);
    });
  }
}
```

### Custom Error Context

```typescript
Sentry.configureScope((scope) => {
  scope.setTag('booking_type', bookingType);
  scope.setUser({
    id: userId,
    email: userEmail,
  });
  scope.setExtra('booking_details', bookingData);
});
```

## Alert Configuration

### Critical Alerts

1. **Booking Flow Errors**
   ```json
   {
     "name": "Booking Flow Alert",
     "conditions": [
       {
         "type": "event",
         "filter": "event.type:error AND tags.category:booking",
         "frequency": "5 minutes",
         "value": 1
       }
     ],
     "actions": [
       {
         "type": "slack",
         "channel": "#booking-alerts"
       },
       {
         "type": "email",
         "targetType": "team"
       }
     ]
   }
   ```

2. **Payment Flow Failures**
   ```json
   {
     "name": "Payment Flow Alert",
     "conditions": [
       {
         "type": "event",
         "filter": "event.type:error AND tags.category:payment",
         "frequency": "5 minutes",
         "value": 1
       }
     ],
     "actions": [
       {
         "type": "slack",
         "channel": "#payment-alerts"
       },
       {
         "type": "pagerduty",
         "service": "PAYMENT_SERVICE_ID"
       }
     ]
   }
   ```

3. **Performance Degradation**
   ```json
   {
     "name": "Performance Alert",
     "conditions": [
       {
         "type": "transaction",
         "filter": "transaction.duration:>3s",
         "frequency": "15 minutes",
         "value": 5
       }
     ],
     "actions": [
       {
         "type": "slack",
         "channel": "#performance-alerts"
       }
     ]
   }
   ```

### Metric Alerts

1. **Error Rate Monitor**
   - Threshold: >5% error rate over 5 minutes
   - Scope: All transactions
   - Resolution: 1 minute
   - Alert channels: Slack, Email

2. **API Latency Monitor**
   - Threshold: >1s p95 latency
   - Scope: API endpoints
   - Resolution: 5 minutes
   - Alert channels: Slack

3. **User Impact Monitor**
   - Threshold: >100 affected users
   - Scope: Error events
   - Resolution: 15 minutes
   - Alert channels: Slack, PagerDuty

## Dashboard Configuration

### Main Dashboard

1. **Error Overview**
   ```json
   {
     "title": "Error Overview",
     "widgets": [
       {
         "type": "line",
         "query": "count_unique(user.id)",
         "name": "Affected Users"
       },
       {
         "type": "table",
         "query": "top 10 error.type",
         "name": "Top Errors"
       }
     ]
   }
   ```

2. **Performance Metrics**
   ```json
   {
     "title": "Performance",
     "widgets": [
       {
         "type": "line",
         "query": "avg(transaction.duration)",
         "name": "Average Response Time"
       },
       {
         "type": "area",
         "query": "p95(transaction.duration)",
         "name": "p95 Latency"
       }
     ]
   }
   ```

### Feature Dashboards

1. **Booking Flow**
   - Booking success rate
   - Error distribution
   - API performance
   - User flow funnel

2. **Payment Processing**
   - Transaction success rate
   - Payment gateway errors
   - Processing times
   - Recovery rate

## Performance Monitoring

### Transaction Tracing

```typescript
Sentry.startTransaction({
  name: 'Booking Process',
  op: 'booking.create',
  data: {
    'booking.type': bookingType,
    'booking.amount': amount,
  },
});
```

### Custom Performance Metrics

```typescript
Sentry.metrics.increment('booking.attempts');
Sentry.metrics.timing('payment.duration', paymentDuration);
Sentry.metrics.distribution('booking.amount', bookingAmount);
```

## Session Replay Configuration

```typescript
Sentry.init({
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
      maskAllInputs: true,
      networkDetailAllowUrls: [
        'https://api.indicab.com/booking',
        'https://api.indicab.com/payment'
      ],
    }),
  ],
});
```

## Best Practices

1. **Error Tracking**
   - Use custom contexts for detailed debugging
   - Implement proper error boundaries
   - Add user context when available
   - Tag errors appropriately

2. **Performance Monitoring**
   - Set up custom transactions for critical flows
   - Monitor API endpoints
   - Track client-side performance
   - Use custom metrics for business KPIs

3. **Alerting**
   - Configure appropriate thresholds
   - Use different channels for different severity
   - Implement alert routing
   - Set up escalation policies

4. **Dashboard Management**
   - Create role-specific views
   - Set up automated reports
   - Monitor trends over time
   - Share insights with stakeholders

## Security Considerations

1. **Data Scrubbing**
   - Mask PII in error reports
   - Filter sensitive data
   - Implement proper sampling
   - Use secure connections

2. **Access Control**
   - Implement role-based access
   - Audit access logs
   - Rotate API keys regularly
   - Monitor usage patterns

## References

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Performance Monitoring Guide](https://docs.sentry.io/product/performance/)
- [Session Replay Documentation](https://docs.sentry.io/product/session-replay/)
- [Metric Alerts Guide](https://docs.sentry.io/product/alerts/metric-alerts/)
- [Dashboard Creation](https://docs.sentry.io/product/dashboards/custom-dashboards/)

---

This configuration ensures comprehensive monitoring and quick response to issues in the IndiCab application. Regular review and updates of these configurations are recommended to maintain optimal monitoring effectiveness.
