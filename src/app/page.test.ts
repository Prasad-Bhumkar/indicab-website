import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

// Test to check if the home page component exists
describe('Home Page', () => {
    it('home page component exists', () => {
        const _homePage = fs.existsSync(path.join(process.cwd(), 'src/app/page.tsx'));
        expect(_homePage).toBe(true);
    });

    // Test to verify the Hero component is imported in the home page
    it('home page imports Hero component', async () => {
        const _homePagePath = path.join(process.cwd(), 'src/app/page.tsx');
        const _content = fs.readFileSync(_homePagePath, 'utf8');

        expect(_content).toContain('Hero');
    });
});
