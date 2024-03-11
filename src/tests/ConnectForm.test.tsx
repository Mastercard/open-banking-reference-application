import { render, screen } from '@testing-library/react';
import ConnectForm from '../components/ConnectForm/ConnectForm';

describe('Testing ConnectForm Component', () => {
    test('Should render connect form', () => {
        render((<ConnectForm />) as React.ReactElement);
        expect(screen.getByTestId('stepper')).toBeInTheDocument();
        expect(screen.getByTestId('step-1')).toBeInTheDocument();
        expect(screen.getByTestId('stepLabel-1')).toBeInTheDocument();
        expect(screen.getByTestId('stepContent-1')).toBeInTheDocument();
        expect(screen.getByTestId('form')).toBeInTheDocument();
        expect(screen.getByTestId('accordian-1')).toBeInTheDocument();
        expect(screen.getByTestId('accordianSummary-1')).toBeInTheDocument();
        expect(screen.getByTestId('accordianDetails-1')).toBeInTheDocument();
        expect(screen.getAllByTestId('customer-input')[0]).toBeInTheDocument();
        expect(screen.getByTestId('submitButton-1')).toBeInTheDocument();
    });
});
