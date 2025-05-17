// Generic type for unknown data
export type UnknownData = unknown;

// Type for generic function parameters
export type GenericFunction = (...args: unknown[]) => unknown;

// Type for generic objects
export type GenericObject = Record<string, unknown>;

// Type for API responses
export type ApiResponse<T> = {
    data: T;
    status: number;
    message?: string;
    error?: string;
};

// Type for API error
export type ApiError = {
    status: number;
    message: string;
    code?: string;
    details?: Record<string, unknown>;
};

// Type for component event handlers
export type EventHandler<E = Event> = (event: E) => void;

// Type for async function that may throw
export type AsyncFunction<T> = () => Promise<T>;

// Type for component props with children
export type PropsWithChildren<P = unknown> = P & {
    children?: React.ReactNode;
};

// Type for form event handlers
export type FormEventHandler = EventHandler<React.FormEvent>;

// Type for input change handlers
export type InputChangeHandler = EventHandler<React.ChangeEvent<HTMLInputElement>>;

// Type for select change handlers
export type SelectChangeHandler = EventHandler<React.ChangeEvent<HTMLSelectElement>>;

// Type for component ref
export type ComponentRef<T> = React.RefObject<T>;

// Type for mutable ref
export type MutableRef<T> = React.MutableRefObject<T>;

// Type for component styles
export type ComponentStyles = React.CSSProperties;

// Type for component class names
export type ClassNames = string | undefined | null | boolean | Record<string, boolean>;

// Type for component data attributes
export type DataAttributes = Record<`data-${string}`, string | number | boolean>;

// Type for component aria attributes
export type AriaAttributes = Record<`aria-${string}`, string | number | boolean>; 
