import { render, screen } from '@testing-library/react';
import ConnectForm from '../components/ConnectForm/ConnectForm';
import { Provider } from 'react-redux';
import store from '../store';
import userEvent from '@testing-library/user-event';
jest.mock('../components/ConnectForm/helper.ts');

import * as commonHelpers from '../utils/helper';
import * as helpers from '../components/ConnectForm/helper';
describe('Testing ConnectForm Component', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears the cache
        jest.mock('../components/ConnectForm/helper');
        jest.spyOn(commonHelpers, 'generateAppToken').mockImplementation(() =>
            Promise.resolve('token_dummy')
        );
        jest.spyOn(helpers, 'activateCustomer').mockImplementation(() =>
            Promise.resolve({
                id: '2493212',
                username: 'customer_1722493735',
                createdDate: '1722529742',
            })
        );
        jest.spyOn(helpers, 'generateConnectUrl').mockImplementation(() =>
            Promise.resolve('connectLink')
        );
        jest.spyOn(helpers, 'createConsumer').mockImplementation(() =>
            Promise.resolve({ consumerId: '34455' })
        );
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restores all mocks to their original implementation
        jest.resetAllMocks();
    });

    test('Should render connect form', () => {
        render(
            (
                <Provider store={store}>
                    <ConnectForm />
                </Provider>
            ) as React.ReactElement
        );

        expect(screen.getByTestId('stepper')).toBeInTheDocument();
        expect(screen.getByTestId('step-1')).toBeInTheDocument();
        expect(screen.getByTestId('stepLabel-1')).toBeInTheDocument();
        expect(screen.getByTestId('stepContent-1')).toBeInTheDocument();
        expect(screen.getByTestId('form')).toBeInTheDocument();
        expect(screen.getByTestId('accordian-1')).toBeInTheDocument();
        expect(screen.getByTestId('accordianSummary-1')).toBeInTheDocument();
        expect(screen.getByTestId('accordianDetails-1')).toBeInTheDocument();
        expect(screen.getAllByTestId('customer-input')[0]).toBeInTheDocument();
    });
    test('trigger click event and create customer', async () => {
        const user = userEvent.setup();

        render(
            (
                <Provider store={store}>
                    <ConnectForm />
                </Provider>
            ) as React.ReactElement
        );
        await user.click(screen.getByRole('button', { name: /View demo/i }));
        expect(commonHelpers.generateAppToken).toHaveBeenCalled();
    });
    test('trigger click event and create customer and further steps', async () => {
        const user = userEvent.setup();
        render(
            (
                <Provider store={store}>
                    <ConnectForm />
                </Provider>
            ) as React.ReactElement
        );

        await user.click(screen.getByRole('button', { name: /View demo/i }));
        const element = await screen.findByText(/AUTO CREATION COMPLETE/i);
        expect(element).toBeInTheDocument();
        const connectElement = await screen.findByText('Connect Bank Account');
        expect(connectElement).toBeInTheDocument();

        await user.click(connectElement);
        expect(commonHelpers.generateAppToken).toHaveBeenCalled();
    });
});
