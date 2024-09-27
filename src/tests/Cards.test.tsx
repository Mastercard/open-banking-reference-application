import { render, screen } from '@testing-library/react';
import Cards from '../components/Cards/Cards';

describe('Testing Cards Component', () => {
    test('Should render API product card', () => {
        render((<Cards />) as React.ReactElement);
        expect(
            screen.getByText(/api product/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should render quick start guide card', () => {
        render((<Cards />) as React.ReactElement);
        expect(
            screen.getByText(/quick start guide/i, { exact: false })
        ).toBeInTheDocument();
    });
});
