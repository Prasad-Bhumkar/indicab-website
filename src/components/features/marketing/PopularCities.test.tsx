import { render, screen } from '@testing-library/react';

import PopularCities from '../PopularCities';

describe('PopularCities Component', () => {
    test('PopularCities component renders without crashing', () => {
        render(<PopularCities />);
        const _titleElement = screen.getByText(/Service Cities/i);
        expect(_titleElement).toBeInTheDocument();
    });

    test('PopularCities component contains city links', () => {
        render(<PopularCities />);
        const _cityLinks = screen.getAllByRole('link');
        expect(_cityLinks.length).toBeGreaterThan(0); // Ensure there are city links
    });

    test('Component has a section title', () => {
        render(<PopularCities />);
        const _titleElement = screen.getByText(/Service Cities/i);
        expect(_titleElement).toBeInTheDocument();
    });
});
