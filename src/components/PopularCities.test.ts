import { render, screen } from '@testing-library/react';
import PopularCities from './PopularCities';

describe('PopularCities Component', () => {
  test('PopularCities component renders without crashing', () => {
    render(<PopularCities />);
    const titleElement = screen.getByText(/Service Cities/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('PopularCities component contains city links', () => {
    render(<PopularCities />);
    const cityLinks = screen.getAllByRole('link');
    expect(cityLinks.length).toBeGreaterThan(0); // Ensure there are city links
  });

  test('Component has a section title', () => {
    render(<PopularCities />);
    const titleElement = screen.getByText(/Service Cities/i);
    expect(titleElement).toBeInTheDocument();
  });
});
