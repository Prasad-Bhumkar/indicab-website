import './button.css';

export interface ButtonProps {
    /** What background color to use */
    backgroundColor?: string;
    /** How large should the button be? */
    size?: 'sm' | 'lg' | 'default' | 'icon';
    /** Button contents */
    children: React.ReactNode;
    /** Optional click handler */
    onClick?: () => void;
    /** Visual variant */
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
}

/** Primary UI component for user interaction */
export const Button = ({
    size = 'default',
    backgroundColor,
    children,
    variant = 'default',
    ...props
}: ButtonProps): JSX.Element => {
    const _mode =
        variant === 'secondary' ? 'storybook-button--secondary'
        : variant === 'destructive' ? 'storybook-button--destructive'
        : variant === 'outline' ? 'storybook-button--outline'
        : variant === 'ghost' ? 'storybook-button--ghost'
        : variant === 'link' ? 'storybook-button--link'
        : 'storybook-button--default';
    return (
        <button
            type="button"
            className={['storybook-button', `storybook-button--${size}`, _mode].join(' ')}
            {...props}
        >
            {children}
            <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
        </button>
    );
};
