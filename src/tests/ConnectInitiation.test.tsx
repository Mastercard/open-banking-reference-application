import { render, screen } from '@testing-library/react';
import ConnectInitiation from '../components/ConnectInitiation/ConnectInitiation';

const userData = {
    username: 'testing-customer',
    createdDate: Date.now(),
};

describe('Testing ConnectInitiation component', () => {
    test('Should render ConnectInitiation component', () => {
        render((<ConnectInitiation user={userData} />) as React.ReactElement);
        expect(screen.getByTestId('customer-name')).toBeInTheDocument();
        expect(
            screen.getAllByTestId('customer-created-date')[0]
        ).toBeInTheDocument();
    });

    test('Should have customer name', () => {
        render((<ConnectInitiation user={userData} />) as React.ReactElement);
        const customerNameElement = screen.getByTestId('customer-name');
        expect(customerNameElement.textContent).toEqual('John Smith');
    });

    test('Should have customer created date', () => {
        render((<ConnectInitiation user={userData} />) as React.ReactElement);
        const customerNameElement = screen.getAllByTestId(
            'customer-created-date'
        );
        expect(customerNameElement[2].textContent).toEqual(
            new Date(userData.createdDate * 1000).toDateString()
        );
    });
});
