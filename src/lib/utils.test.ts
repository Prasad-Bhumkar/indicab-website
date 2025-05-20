import { describe, expect } from 'vitest';
import { cn } from './utils';

describe('Utils Functions', () => {
    describe('cn (className merging function)', () => {
        test('combines classes together', () => {
            const _result = cn('class1', 'class2');
            expect(_result).toBe('class1 class2');
        });

        test('conditionally includes classes', () => {
            const _result = cn('class1', { 'class2': true, 'class3': false });
            expect(_result).toBe('class1 class2');
        });

        test('handles multiple arguments of different types', () => {
            const _result = cn(
                'base-class',
                { 'conditional-true': true, 'conditional-false': false },
                'another-class'
            );
            expect(_result).toBe('base-class conditional-true another-class');
        });
    });
});
