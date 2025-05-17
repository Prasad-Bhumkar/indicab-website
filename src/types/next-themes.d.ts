declare module 'next-themes' {
    export function useTheme(): {
        theme: string;
        setTheme: (_theme: string) => void;
    };
}
