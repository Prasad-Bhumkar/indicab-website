# Sentry Alerting and Dashboard Configuration for Indicab

This document provides guidance on configuring alerting and dashboards in Sentry for proactive monitoring of the Indicab application.

## Alerting Configuration

Set up alert rules in Sentry to notify your team about critical issues in booking and payment flows.

### Example Alert Rules

1. **Booking Flow Errors**
   - Trigger: When an error event occurs in the booking flow (e.g., errors tagged with `booking` category or specific error messages).
   - Condition: At least 1 event in 5 minutes.
   - Action: Send notification to Slack/email/pager duty.

2. **Payment Flow Failures**
   - Trigger: When payment failures occur (e.g., errors tagged with `payment` category).
   - Condition: At least 1 event in 5 minutes.
   - Action: Send notification to Slack/email/pager duty.

3. **High Error Rate**
   - Trigger: When error rate exceeds a threshold (e.g., >5% of transactions fail).
   - Condition: Error rate threshold breach.
   - Action: Send notification and create an incident.

### Setting Up Alerts

- Go to your Sentry project.
- Navigate to **Alerts** > **Rules**.
- Create new alert rules based on the above criteria.
- Configure notification channels (Slack, email, PagerDuty, etc.).

## Dashboard Configuration

Create dashboards to visualize key metrics and trends.

### Suggested Widgets

- **Error Count Over Time**: Track the number of errors in booking and payment flows.
- **Transaction Performance**: Monitor transaction durations and throughput.
- **User Impact**: See how many users are affected by errors.
- **Release Health**: Track releases and associated issues.

### Creating Dashboards

- Go to **Dashboards** in Sentry.
- Create a new dashboard named "Indicab Monitoring".
- Add widgets for the above metrics.
- Share the dashboard with your team.

## Additional Recommendations

- Use Sentry's **Performance Monitoring** to trace slow transactions.
- Enable **Session Replay** for client-side error context.
- Regularly review and tune alert thresholds to reduce noise.

## References

- [Sentry Alert Rules Documentation](https://docs.sentry.io/product/alerts/alert-rules/)
- [Sentry Dashboards Documentation](https://docs.sentry.io/product/dashboards/)
- [Sentry Performance Monitoring](https://docs.sentry.io/product/performance/)

---

By following these guidelines, you can ensure proactive monitoring and quick response to issues in the Indicab application.
