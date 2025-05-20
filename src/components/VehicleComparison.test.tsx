import { render, screen } from '@testing-library/react';
import { describe, expect, test, vitest } from 'vitest';

import _VehicleComparison from './VehicleComparison';

describe('VehicleComparison Component', () => {
    test('renders comparison with correct vehicle details', () => {
        render(<_VehicleComparison vehicles={[
            {
                id: '1',
                name: 'Toyota Camry',
                price: 50,
                image: 'toyota-camry.jpg',
                capacity: 4,
                features: ['Air Conditioning', 'Bluetooth']
            },
            {
                id: '2',
                name: 'Honda Accord',
                price: 55,
                image: 'honda-accord.jpg',
                capacity: 4,
                features: ['Air Conditioning', 'Bluetooth']
            }
        ]} />);

        expect(document.body.textContent).toContain('Compare Vehicles');
        expect(screen.getByText('Toyota Camry')).toBeDefined();
        expect(screen.getByText('Honda Accord')).toBeDefined();
        expect(screen.getByText('$50/day')).toBeDefined();
        expect(screen.getByText('$55/day')).toBeDefined();
    });

    test('renders empty state when no vehicles provided', () => {
        render(<_VehicleComparison vehicles={[]} />);

        expect(screen.getByText('Compare Vehicles')).toBeDefined();
        expect(screen.queryByText('Toyota Camry')).toBeNull();
    });

    test('logs initial distance when provided', () => {
        const consoleSpy = vitest.spyOn(console, 'log');
        render(<_VehicleComparison vehicles={[
            {
                id: '1',
                name: 'Toyota Camry',
                price: 50,
                image: 'toyota-camry.jpg',
                capacity: 4,
                features: ['Air Conditioning', 'Bluetooth']
            },
            {
                id: '2',
                name: 'Honda Accord',
                price: 55,
                image: 'honda-accord.jpg',
                capacity: 4,
                features: ['Air Conditioning', 'Bluetooth']
            }
        ]} initialDistance={100} />);

        expect(consoleSpy).toHaveBeenCalledWith('Initial distance:', 100);
        consoleSpy.mockRestore();
    });

    test('matches snapshot', () => {
        const { container } = render(<_VehicleComparison vehicles={[
            {
                id: '1',
                name: 'Toyota Camry',
                price: 50,
                image: 'toyota-camry.jpg',
                capacity: 4,
                features: ['Air Conditioning', 'Bluetooth']
            },
            {
                id: '2',
                name: 'Honda Accord',
                price: 55,
                image: 'honda-accord.jpg',
                capacity: 4,
                features: ['Air Conditioning', 'Bluetooth']
            }
        ]} />);
        expect(container).toMatchSnapshot();
    });
});
