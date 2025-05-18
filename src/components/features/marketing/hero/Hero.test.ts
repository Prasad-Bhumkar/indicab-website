import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

describe('Hero Component', () => {
    it('Hero component exists', () => {
        const _componentPath = path.join(process.cwd(), 'src/components/features/marketing/hero/Hero.tsx');
        const _exists = fs.existsSync(_componentPath);
        expect(_exists).toBe(true);
    });

    it('Hero component contains a headline and subtext', () => {
        const _componentPath = path.join(process.cwd(), 'src/components/features/marketing/hero/Hero.tsx');
        const content = fs.readFileSync(_componentPath, 'utf8');
        expect(content).toContain('h1');
        expect(content).toContain('p');
    });

    it('Hero has a call-to-action button', () => {
        const _componentPath = path.join(process.cwd(), 'src/components/features/marketing/hero/Hero.tsx');
        const content = fs.readFileSync(_componentPath, 'utf8');
        expect(content).toContain('Button');
    });
});
