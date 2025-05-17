import { expect, test, describe } from 'bun:test';
import fs from 'fs';
import path from 'path';

describe('Hero Component', () => {
    test('Hero component exists', () => {
        const _componentPath = path.join(process.cwd(), 'src/components/Hero.tsx');
        const _exists = fs.existsSync(_componentPath);
        expect(_exists).toBe(true);
    });

    test('Hero component contains a headline and subtext', () => {
        const _componentPath = path.join(process.cwd(), 'src/components/Hero.tsx');
        const content = fs.readFileSync(_componentPath, 'utf8');

        // Check for headline elements
        expect(content).toContain('h1');
        expect(content).toContain('p');
    });

    test('Hero has a call-to-action button', () => {
        const _componentPath = path.join(process.cwd(), 'src/components/Hero.tsx');
        const content = fs.readFileSync(_componentPath, 'utf8');

        // Check for CTA button
        expect(content).toContain('Button');
        expect(content).toContain('Book');
    });
});
