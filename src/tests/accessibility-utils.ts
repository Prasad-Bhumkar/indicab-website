import type { ReactElement } from 'react';

import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend expect with axe matchers
expect.extend(toHaveNoViolations);

// Accessibility testing utilities
export const testA11y = async (ui: ReactElement) => {
  const { container } = render(ui);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

// Common accessibility patterns to test
export const a11yPatterns = {
  // Test if element is focusable
  isFocusable: (element: HTMLElement) => {
    expect(element).toHaveAttribute('tabindex');
    expect(element).not.toHaveAttribute('tabindex', '-1');
  },

  // Test if element has proper ARIA attributes
  hasAriaAttributes: (element: HTMLElement, attributes: Record<string, string>) => {
    Object.entries(attributes).forEach(([key, value]) => {
      expect(element).toHaveAttribute(`aria-${key}`, value);
    });
  },

  // Test if element has proper role
  hasRole: (element: HTMLElement, role: string) => {
    expect(element).toHaveAttribute('role', role);
  },

  // Test if element has proper label
  hasLabel: (element: HTMLElement, label: string) => {
    expect(element).toHaveAccessibleName(label);
  },

  // Test if element has proper description
  hasDescription: (element: HTMLElement, description: string) => {
    expect(element).toHaveAccessibleDescription(description);
  },

  // Test if element is properly hidden from screen readers
  isHiddenFromScreenReaders: (element: HTMLElement) => {
    expect(element).toHaveAttribute('aria-hidden', 'true');
  },

  // Test if element has proper heading level
  hasHeadingLevel: (element: HTMLElement, level: number) => {
    expect(element.tagName.toLowerCase()).toBe(`h${level}`);
  },

  // Test if element has proper color contrast
  hasColorContrast: (element: HTMLElement) => {
    const style = window.getComputedStyle(element);
    const backgroundColor = style.backgroundColor;
    const color = style.color;
    // Note: This is a simplified check. Use a proper color contrast library in production
    expect(backgroundColor).not.toBe(color);
  },

  // Test if element has proper keyboard navigation
  hasKeyboardNavigation: (element: HTMLElement) => {
    expect(element).toHaveAttribute('tabindex');
    expect(element).toHaveAttribute('role');
  },

  // Test if element has proper focus management
  hasFocusManagement: (element: HTMLElement) => {
    element.focus();
    expect(document.activeElement).toBe(element);
  },
};

// Common accessibility test suites
export const a11yTestSuites = {
  // Test button accessibility
  button: (element: HTMLElement) => {
    a11yPatterns.hasRole(element, 'button');
    a11yPatterns.isFocusable(element);
    a11yPatterns.hasKeyboardNavigation(element);
  },

  // Test link accessibility
  link: (element: HTMLElement) => {
    a11yPatterns.hasRole(element, 'link');
    a11yPatterns.isFocusable(element);
    a11yPatterns.hasKeyboardNavigation(element);
  },

  // Test form control accessibility
  formControl: (element: HTMLElement, label: string) => {
    a11yPatterns.hasLabel(element, label);
    a11yPatterns.isFocusable(element);
    a11yPatterns.hasKeyboardNavigation(element);
  },

  // Test heading accessibility
  heading: (element: HTMLElement, level: number) => {
    a11yPatterns.hasHeadingLevel(element, level);
    a11yPatterns.hasColorContrast(element);
  },

  // Test modal accessibility
  modal: (element: HTMLElement) => {
    a11yPatterns.hasRole(element, 'dialog');
    a11yPatterns.hasAriaAttributes(element, {
      modal: 'true',
      labelledby: expect.any(String),
    });
    a11yPatterns.hasFocusManagement(element);
  },
};

// Helper to test component accessibility
export const testComponentA11y = async (
  ui: ReactElement,
  testSuite: (element: HTMLElement) => void
) => {
  const { container } = render(ui);
  const element = container.firstElementChild as HTMLElement;
  testSuite(element);
  await testA11y(ui);
}; 