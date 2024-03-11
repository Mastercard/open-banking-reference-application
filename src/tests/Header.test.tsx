import { render, screen } from '@testing-library/react';
import Header from '../components/Header/Header';

describe('Testing Header Component', () => {
    test('Should have header left content', () => {
        render((<Header />) as React.ReactElement);
        expect(
            screen.getByText('developer', { exact: false })
        ).toBeInTheDocument();
    });

    test('Should have header middle content', () => {
        render((<Header />) as React.ReactElement);
        expect(
            screen.getByText('reference app', { exact: false })
        ).toBeInTheDocument();
    });

    test('Should have header right content', () => {
        render((<Header />) as React.ReactElement);
        expect(
            screen.getByText('github', { exact: false })
        ).toBeInTheDocument();
    });

    test('developer text should have href attribute', () => {
        render((<Header />) as React.ReactElement);
        expect(
            screen.getByRole('link', { name: /developers/i })
        ).toHaveAttribute('href');
    });

    test('developer text should have target attribute', () => {
        render((<Header />) as React.ReactElement);
        expect(
            screen.getByRole('link', { name: /developers/i })
        ).toHaveAttribute('target');
    });

    test('developer text should have target attribute with value _blank', () => {
        render((<Header />) as React.ReactElement);
        expect(
            screen.getByRole('link', { name: /developers/i })
        ).toHaveAttribute('target', '_blank');
    });

    test('view on github text should have href attribute', () => {
        render((<Header />) as React.ReactElement);
        expect(
            screen.getByRole('link', { name: /view on github/i })
        ).toHaveAttribute('href');
    });

    test('view on github text should have target attribute', () => {
        render((<Header />) as React.ReactElement);
        expect(
            screen.getByRole('link', { name: /view on github/i })
        ).toHaveAttribute('target');
    });

    test('view on github text should have target attribute with value _blank', () => {
        render((<Header />) as React.ReactElement);
        expect(
            screen.getByRole('link', { name: /view on github/i })
        ).toHaveAttribute('target', '_blank');
    });
});
