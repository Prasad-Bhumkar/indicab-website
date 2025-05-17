import React from "react";
import { render, screen } from '@testing-library/react';
import PopularCities from '../PopularCities';

describe('PopularCities Component', (): JSX.Element => {
    test('PopularCities component renders without crashing', (): JSX.Element => {
        render(<PopularCities />);
        const _titleElement = screen.getByText(/Service Cities/i);
        expect(_titleElement).toBeInTheDocument();
    });

    test('PopularCities component contains city links', (): JSX.Element => {
        render(<PopularCities />);
        const _cityLinks = screen.getAllByRole('link');
        expect(_cityLinks.length).toBeGreaterThan(0); // Ensure there are city links
    });

    test('Component has a section title', (): JSX.Element => {
        render(<PopularCities />);
        const _titleElement = screen.getByText(/Service Cities/i);
        expect(_titleElement).toBeInTheDocument();
    });
});
