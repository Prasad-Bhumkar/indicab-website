import React from 'react';
import { useBookingContext } from '../context/BookingContext';

const _BookingProgress: React.FC = (): JSX.Element => {
    const { state } = useBookingContext();

    let message = '';
    switch (state.status) {
        case 'pending':
            message = 'Your booking is pending confirmation.';
            break;
        case 'confirmed':
            message = 'Your booking is confirmed!';
            break;
        case 'cancelled':
            message = 'Your booking has been cancelled.';
            break;
        default:
            message = '';
    }

    if (!state.id) {
        return null; // No booking yet
    }

    return (
        <div className="p-4 bg-blue-100 text-blue-800 rounded-md mb-4">
            {message}
        </div>
    );
};

export default _BookingProgress;
