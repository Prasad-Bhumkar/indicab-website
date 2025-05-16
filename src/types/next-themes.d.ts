declare module 'next-themes' {
  export function useTheme(): {
    theme: string;
    setTheme: (theme: string) => void;
  };
}