import { expect, test, describe } from 'bun:test';
import { cn } from './utils';

describe('Utils Functions', () => {
  describe('cn (className merging function)', () => {
    test('combines classes together', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    test('conditionally includes classes', () => {
      const result = cn('class1', { 'class2': true, 'class3': false });
      expect(result).toBe('class1 class2');
    });

    test('handles multiple arguments of different types', () => {
      const result = cn(
        'base-class',
        { 'conditional-true': true, 'conditional-false': false },
        'another-class'
      );
      expect(result).toBe('base-class conditional-true another-class');
    });
  });
});
