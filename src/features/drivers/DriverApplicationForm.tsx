import React from 'react';

export interface DriverApplicationFormProps {
    onSubmit: (data: any) => void;
    loading?: boolean;
    error?: string;
}

const _DriverApplicationForm: React.FC<DriverApplicationFormProps> = ({ onSubmit, loading, error }): JSX.Element => {
    const _handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const _formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(_formData);
        onSubmit(data);
    };

    return (
        <form onSubmit={_handleSubmit}>
            {error && <p className="error">{error}</p>}
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
};

export default _DriverApplicationForm;
