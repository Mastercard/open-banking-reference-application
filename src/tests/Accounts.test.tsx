import { render, screen } from '@testing-library/react';
import Accounts from '../components/Accounts/Accounts';
import requestData from './Mocks/request-data';
import { Provider } from 'react-redux';
import store from '../store';
describe('Testing Accounts Component', () => {
    test('Should render Accounts', () => {
        render(
            (
                <Provider store={store}>
                    <Accounts requestData={requestData} />
                </Provider>
            ) as React.ReactElement
        );

        const accounts = screen.getByTestId('accounts-test');
        expect(accounts.textContent).toContain('using connect');
    });
});
