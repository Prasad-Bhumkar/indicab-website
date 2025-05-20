import { expect, test } from '@playwright/test';

test.describe('Accessibility tests', () => {
    const _pages = [
        '/',
        '/booking',
        '/vehicles',
        '/profile',
        '/contact',
    ];

    for (const page of _pages) {
        test(`should have no accessibility violations on ${page}`, async ({ page: pwPage }) => {
            await pwPage.goto(page);
            const _accessibilitySnapshot = await pwPage.accessibility.snapshot();
            expect(_accessibilitySnapshot).toBeTruthy();
            // Additional accessibility assertions can be added here
        });
    }
});
