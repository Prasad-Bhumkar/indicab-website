# Testing Guide

## Overview

This guide covers our testing strategy, tools, and best practices for the IndiCab project.

## Testing Levels

### 1. Unit Testing
- **Tools**: Vitest
- **Location**: `src/**/*.test.ts(x)`
- **Coverage**: 80% minimum
- **Focus**: Individual components, hooks, and utilities

### 2. Integration Testing
- **Tools**: Vitest + Testing Library
- **Location**: `src/**/*.integration.test.ts(x)`
- **Focus**: Component interactions and data flow

### 3. E2E Testing
- **Tools**: Playwright
- **Location**: `e2e/**/*.spec.ts`
- **Focus**: User flows and critical paths

### 4. Performance Testing
- **Tools**: Custom performance utilities
- **Location**: `src/**/*.perf.test.ts(x)`
- **Focus**: Load times, render performance, API response times

## Test Utilities

### Setup
```typescript
import { render, screen } from '@/tests/setup';
import { generateMockUser } from '@/tests/utils';
```

### Performance Testing
```typescript
import { measurePerformance, expectPerformance } from '@/tests/performance-utils';

test('component renders within performance budget', async () => {
  const { averageRenderTime } = await measureRenderPerformance(async () => {
    render(<MyComponent />);
  });
  
  expectPerformance.toBeFasterThan(averageRenderTime, 100); // 100ms budget
});
```

### API Testing
```typescript
import { createMockRequest, expectApiSuccess } from '@/tests/api-utils';

test('API endpoint returns success', async () => {
  const request = createMockRequest({
    method: 'GET',
    headers: { 'Authorization': 'Bearer token' }
  });
  
  const response = await handler(request);
  await expectApiSuccess(response, userSchema);
});
```

## Best Practices

1. **Test Organization**
   - Group related tests using `describe` blocks
   - Use clear, descriptive test names
   - Follow the Arrange-Act-Assert pattern

2. **Component Testing**
   - Test user interactions
   - Verify accessibility
   - Check error states
   - Test loading states

3. **API Testing**
   - Test success and error cases
   - Verify response schemas
   - Check authentication
   - Test rate limiting

4. **Performance Testing**
   - Set performance budgets
   - Monitor memory usage
   - Track render times
   - Measure API response times

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- src/components/Button.test.tsx

# Run tests with coverage
npm test -- --coverage

# Run E2E tests
npm run test:e2e

# Run performance tests
npm run test:perf
```

## Test Reports

- Coverage reports: `coverage/`
- Test reports: `reports/`
- E2E reports: `playwright-report/`

## CI/CD Integration

Tests run automatically on:
- Pull requests
- Push to main/develop
- Manual triggers

## Troubleshooting

### Common Issues

1. **Test Timeouts**
   - Increase timeout in `vitest.config.ts`
   - Check for infinite loops
   - Verify async operations

2. **Memory Leaks**
   - Use `measureMemoryUsage()`
   - Check cleanup in `afterEach`
   - Monitor heap usage

3. **Flaky Tests**
   - Add retry logic
   - Use proper async handling
   - Mock external dependencies

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)
- [Jest DOM](https://github.com/testing-library/jest-dom) 