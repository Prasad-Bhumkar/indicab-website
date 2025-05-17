import { expect, test, describe } from 'bun:test';
import fs from 'fs';
import path from 'path';

describe('Header Component', () => {
    test('Header component exists', () => {
        const _componentPath = path.join(process.cwd(), 'src/components/Header.tsx');
        const _exists = fs.existsSync(_componentPath);
        expect(_exists).toBe(true);
    });

    test('Header component has navigation links', () => {
        const _componentPath = path.join(process.cwd(), 'src/components/Header.tsx');
        const content = fs.readFileSync(_componentPath, 'utf8');

        // Check for navigation elements
        expect(content).toContain('Link');
        expect(content).toContain('href="/"');
        expect(content).toContain('IndiCab');
    });

    test('Header has mobile menu functionality', () => {
        const _componentPath = path.join(process.cwd(), 'src/components/Header.tsx');
        const content = fs.readFileSync(_componentPath, 'utf8');

        // Check for mobile menu elements
        expect(content).toContain('Sheet');
        expect(content).toContain('Menu');
    });
});
