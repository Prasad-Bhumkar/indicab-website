import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Control } from 'react-hook-form';
import VehicleTypeSelector from './VehicleTypeSelector';

describe('VehicleTypeSelector', () => {
  const mockControl = {
    register: () => ({
      onChange: vi.fn(),
      onBlur: vi.fn(),
      name: 'vehicleType',
      ref: vi.fn(),
    }),
  } as unknown as Control<any>;

  const mockProps = {
    name: 'vehicleType',
    control: mockControl,
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
    render(<VehicleTypeSelector {...mockProps} disabled={true} />);
    
    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });

  it('applies error styles when error prop is provided', () => {
    const error = {
      type: 'required',
      message: 'Please select a vehicle type',
    };

    render(<VehicleTypeSelector {...mockProps} error={error} />);
    
    const labels = screen.getAllByRole('radio').map(radio => radio.closest('label'));
    labels.forEach(label => {
      expect(label).toHaveClass('border-red-500');
    });
  });

  it('applies disabled styles when disabled prop is true', () => {
    render(<VehicleTypeSelector {...mockProps} disabled={true} />);
    
    const labels = screen.getAllByRole('radio').map(radio => radio.closest('label'));
    labels.forEach(label => {
      expect(label).toHaveClass('bg-gray-100');
    });
  });
}); 