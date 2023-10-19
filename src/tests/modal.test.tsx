import { render, screen } from '@testing-library/react';
import Modal from '../components/Modal/Modal';

describe('Testing Modal Component', () => {
    test('Should have text - Open banking', () => {
        render((<Modal />) as React.ReactElement);
        expect(
            screen.getByText('open banking', { exact: false })
        ).toBeInTheDocument();
    });

    test('Should have text - reference', () => {
        render((<Modal />) as React.ReactElement);
        expect(
            screen.getByText('reference', { exact: false })
        ).toBeInTheDocument();
    });

    test('Should have button - view demo', () => {
        render((<Modal />) as React.ReactElement);
        expect(
            screen.getByRole('button', { name: /view demo/i })
        ).toBeInTheDocument();
    });

    test('Should have button - view on github', () => {
        render((<Modal />) as React.ReactElement);
        expect(
            screen.getByRole('button', { name: /view on github/i })
        ).toBeInTheDocument();
    });

    test('view on github text should have href attribute', () => {
        render((<Modal />) as React.ReactElement);
        expect(
            screen.getByRole('link', { name: /view on github/i })
        ).toHaveAttribute('href');
    });

    test('view on github text should have target attribute', () => {
        render((<Modal />) as React.ReactElement);
        expect(
            screen.getByRole('link', { name: /view on github/i })
        ).toHaveAttribute('target');
    });

    test('view on github text should have target attribute with value _blank', () => {
        render((<Modal />) as React.ReactElement);
        expect(
            screen.getByRole('link', { name: /view on github/i })
        ).toHaveAttribute('target', '_blank');
    });
});
