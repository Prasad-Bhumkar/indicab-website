import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Control } from 'react-hook-form';
import VehicleTypeSelector from './VehicleTypeSelector';

describe('VehicleTypeSelector', (): JSX.Element => {
    const _mockControl = {
        register: () => ({
            onChange: vi.fn(),
            onBlur: vi.fn(),
            name: 'vehicleType',
            ref: vi.fn(),
        }),
    } as unknown as Control<any>;

    const mockProps = {
        name: 'vehicleType',
        control: _mockControl,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders all vehicle types', (): JSX.Element => {
        render(<VehicleTypeSelector {...mockProps} />);

        expect(screen.getByText('Economy')).toBeInTheDocument();
        expect(screen.getByText('Standard')).toBeInTheDocument();
        expect(screen.getByText('Premium')).toBeInTheDocument();
        expect(screen.getByText('Luxury')).toBeInTheDocument();
    });

    it('displays error message when error prop is provided', (): JSX.Element => {
        const error = {
            type: 'required',
            message: 'Please select a vehicle type',
        };

        render(<VehicleTypeSelector {...mockProps} error={error} />);
        expect(screen.getByText(error.message)).toBeInTheDocument();
    });

    it('disables radio buttons when disabled prop is true', (): JSX.Element => {
        render(<VehicleTypeSelector {...mockProps} disabled={true} />);

        const _radioButtons = screen.getAllByRole('radio');
        _radioButtons.forEach(_radio => {
            expect(_radio).toBeDisabled();
        });
    });

    it('applies error styles when error prop is provided', (): JSX.Element => {
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

    it('applies disabled styles when disabled prop is true', (): JSX.Element => {
        render(<VehicleTypeSelector {...mockProps} disabled={true} />);

        const _labels = screen.getAllByRole('radio').map(_radio => _radio.closest('label'));
        _labels.forEach(_label => {
            expect(_label).toHaveClass('bg-gray-100');
        });
    });
}); 
