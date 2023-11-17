import { render, screen } from '@testing-library/react';
import SandBoxTip from '../components/SandBoxTip/SandBoxTip';

describe('Testing SandboxTip component', () => {
    test('Should render SanboxTip component', () => {
        render((<SandBoxTip />) as React.ReactElement);
        expect(
            screen.getByText(/sandbox tip/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Sandbox tip should have Institution field', () => {
        render((<SandBoxTip />) as React.ReactElement);
        expect(
            screen.getByText(/institution/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Sandbox tip should have email field', () => {
        render((<SandBoxTip />) as React.ReactElement);
        expect(
            screen.getByText(/Banking Userid/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Sandbox tip should have password field', () => {
        render((<SandBoxTip />) as React.ReactElement);
        expect(
            screen.getByText(/Banking Password/i, { exact: false })
        ).toBeInTheDocument();
    });
});
