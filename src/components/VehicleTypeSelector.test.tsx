import { render, screen } from '@testing-library/react';
import type { Control } from 'react-hook-form';
import { vi } from 'vitest';

import { VehicleTypeSelector } from './VehicleTypeSelector';

describe('VehicleTypeSelector', () => {
    const _mockControl = {
        register: () => ({
            onChange: vi.fn(),
            onBlur: vi.fn(),
            name: 'vehicleType',
            ref: vi.fn(),
        }),
    } as unknown as Control<any>;

    const mockVehicleTypes = [
        { id: 'economy', name: 'Economy', description: 'Economy car', price: 1000, image: '/images/economy.jpg' },
        { id: 'standard', name: 'Standard', description: 'Standard car', price: 1500, image: '/images/standard.jpg' },
        { id: 'premium', name: 'Premium', description: 'Premium car', price: 2000, image: '/images/premium.jpg' },
        { id: 'luxury', name: 'Luxury', description: 'Luxury car', price: 3000, image: '/images/luxury.jpg' }
    ];

    const mockProps = {
        name: 'vehicleType',
        control: _mockControl,
        vehicleTypes: mockVehicleTypes
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders all vehicle types', () => {
        render(<VehicleTypeSelector {...mockProps} />);

        expect(screen.getByText('Economy')).toBeInTheDocument();
        expect(screen.getByText('Standard')).toBeInTheDocument();
        expect(screen.getByText('Premium')).toBeInTheDocument();
        expect(screen.getByText('Luxury')).toBeInTheDocument();
    });

    it('displays error message when error prop is provided', () => {
        const error = {
            type: 'required',
            message: 'Please select a vehicle type',
        };

        render(<VehicleTypeSelector {...mockProps} error={error} />);
        expect(screen.getByText(error.message)).toBeInTheDocument();
    });

    it('disables radio buttons when disabled prop is true', () => {
        render(<VehicleTypeSelector {...mockProps} />);

        const _radioButtons = screen.getAllByRole('radio');
        _radioButtons.forEach(_radio => {
            expect(_radio).toBeDisabled();
        });
    });

    it('applies error styles when error prop is provided', () => {
        const error = {
            type: 'required',
            message: 'Please select a vehicle type',
        };

        render(<VehicleTypeSelector {...mockProps} error={error} />);

        const _labels = screen.getAllByRole('radio').map(_radio => _radio.closest('label'));
        _labels.forEach(_label => {
            expect(_label).toHaveClass('border-red-500');
        });
    });

    it('applies disabled styles when disabled prop is true', () => {
        render(<VehicleTypeSelector {...mockProps} />);

        const _labels = screen.getAllByRole('radio').map(_radio => _radio.closest('label'));
        _labels.forEach(_label => {
            expect(_label).toHaveClass('bg-gray-100');
        });
    });
}); 
