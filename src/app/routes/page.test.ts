import { expect, test, describe } from 'bun:test';
import fs from 'fs';
import path from 'path';

describe('Routes Page', () => {
  test('routes page component exists', () => {
    const routesPage = fs.existsSync(path.join(process.cwd(), 'src/app/routes/page.tsx'));
    expect(routesPage).toBe(true);
  });

  // Test to verify the routes data is imported
  test('routes page imports routes data', async () => {
    const routesPagePath = path.join(process.cwd(), 'src/app/routes/page.tsx');
    const content = fs.readFileSync(routesPagePath, 'utf8');

    expect(content).toContain('routes');
  });

  // Test to verify the page has expected components
  test('routes page has expected UI components', async () => {
    const routesPagePath = path.join(process.cwd(), 'src/app/routes/page.tsx');
    const content = fs.readFileSync(routesPagePath, 'utf8');

    // Check for typical components that should be in the routes page
    expect(content).toContain('RouteDetails');
    expect(content).toContain('MapView');
  });
});
