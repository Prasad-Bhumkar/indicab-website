// Custom matchers for Vitest/Jest
import type { MatcherFunction } from 'expect';

// Custom matcher to check if a DOM element has an IndiCab-specific class
export const toHaveIndicabStyle: MatcherFunction<[string]> = function(received, className) {
    const element = typeof received === 'string' ? received : '';
    const pass = element && (element.includes(`class="${className}"`) || element.includes(`className="${className}"`));

    if (pass) {
        return {
            message: () => `Expected element not to have IndiCab class "${className}", but it does.`,
            pass: true,
        };
    } else {
        return {
            message: () => `Expected element to have IndiCab class "${className}", but it doesn't.`,
            pass: false,
        };
    }
};

// Custom matcher to verify route format (from-to format)
export const toBeValidRouteFormat: MatcherFunction<[]> = function(received) {
    const route = received;
    const _routeRegex = /^[A-Za-z\s]+ to [A-Za-z\s]+$/; // "City1 to City2" format
    const pass = typeof route === 'string' && _routeRegex.test(route);

    if (pass) {
        return {
            message: () => `Expected "${route}" not to be in valid route format, but it is.`,
            pass: true,
        };
    } else {
        return {
            message: () => `Expected "${route}" to be in valid route format (e.g., "Delhi to Agra"), but it isn't.`,
            pass: false,
        };
    }
};

// Custom matcher to check if a price string is in IndiCab format (₹X,XXX)
export const toBeValidFareFormat: MatcherFunction<[]> = function(received) {
    const price = received;
    const _priceRegex = /^₹\d{1,3}(,\d{3})*(\.\d{2})?$/; // ₹X,XXX or ₹X,XXX.XX format
    const pass = typeof price === 'string' && _priceRegex.test(price);

    if (pass) {
        return {
            message: () => `Expected "${price}" not to be in valid IndiCab fare format, but it is.`,
            pass: true,
        };
    } else {
        return {
            message: () => `Expected "${price}" to be in valid IndiCab fare format (e.g., "₹1,499"), but it isn't.`,
            pass: false,
        };
    }
};

// Custom matcher to check if a component has the necessary accessibility attributes
export const toHaveA11yAttributes: MatcherFunction<[string[]]> = function(received, requiredAttributes) {
    const element = typeof received === 'string' ? received : '';
    const attributes = requiredAttributes as string[];

    // Check if all required attributes are present in the element
    const missingAttributes = attributes.filter(attr =>
        !element.includes(`${attr}=`) && !element.includes(`${attr}:`)
    );

    const pass = missingAttributes.length === 0;

    if (pass) {
        return {
            message: () => `Expected element not to have all required a11y attributes (${attributes.join(', ')}), but it does.`,
            pass: true,
        };
    } else {
        return {
            message: () => `Expected element to have all required a11y attributes (${attributes.join(', ')}), but is missing: ${missingAttributes.join(', ')}.`,
            pass: false,
        };
    }
};

// Register all custom matchers for Vitest/Jest
export function registerCustomMatchers() {
    expect.extend({
        toHaveIndicabStyle,
        toBeValidRouteFormat,
        toBeValidFareFormat,
        toHaveA11yAttributes,
    });
}

// Extend TypeScript declarations
declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveIndicabStyle(className: string): R;
            toBeValidRouteFormat(): R;
            toBeValidFareFormat(): R;
            toHaveA11yAttributes(requiredAttributes: string[]): R;
        }
    }
    // For Vitest
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Vi {
        interface Assertion {
            toHaveIndicabStyle(className: string): void;
            toBeValidRouteFormat(): void;
            toBeValidFareFormat(): void;
            toHaveA11yAttributes(requiredAttributes: string[]): void;
        }
    }
}
