import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';

import { Product } from '../components';
import store from '../store';

import requestData from './Mocks/request-data';
import accounts from './Mocks/accounts-data';
import userEvent from '@testing-library/user-event';

describe('Testing product compoment', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears the cache
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restores all mocks to their original implementation
        jest.resetAllMocks();
    });
    test('Should render product name', () => {
        render(
            <Provider store={store}>
                <Product
                    product={'account_ach_details'}
                    requestData={requestData}
                />
            </Provider>
        );
        const requestTypeElement = screen.queryByTestId('request-type');
        expect(requestTypeElement).toBeInTheDocument();
        expect(requestTypeElement?.textContent).toEqual('GET');
    });

    test('Should render product request type', () => {
        render(
            <Provider store={store}>
                <Product
                    product={'account_ach_details'}
                    requestData={requestData}
                />
            </Provider>
        );
        const productNameElement = screen.queryByTestId('product-name');
        expect(productNameElement).toBeInTheDocument();
        expect(productNameElement?.textContent).toEqual('Account ACH Details');
    });

    test('Should render curl command', async () => {
        render(
            <Provider store={store}>
                <Product
                    product={'account_ach_details'}
                    requestData={requestData}
                />
            </Provider>
        );
        await fireEvent.click(screen.getByTestId('button-show-request'));
        const reportSelectElement = await screen.findByTestId('curl-command');
        expect(reportSelectElement).toBeInTheDocument();
    });

    test('Should fetch account information', async () => {
        window.fetch = jest.fn().mockResolvedValue({
            json: async () => {
                return {
                    accounts,
                };
            },
            status: 200,
        });
        render(
            <Provider store={store}>
                <Product product={'accounts'} requestData={requestData} />
            </Provider>
        );
        await act(() => fireEvent.click(screen.getByTestId('send-request')));
        const requestTypeElement = screen.queryByTestId('request-type');
        expect(requestTypeElement).toBeInTheDocument();
        expect(requestTypeElement?.textContent).toEqual('GET');
    });

    test('Should refresh shared accounts', async () => {
        window.fetch = jest.fn().mockResolvedValueOnce({
            json: async () => {
                return {
                    accounts,
                };
            },
            status: 200,
        });
        render(
            <Provider store={store}>
                <Product
                    product={'refresh_accounts'}
                    requestData={requestData}
                />
            </Provider>
        );
        await act(() => fireEvent.click(screen.getByTestId('send-request')));
        const requestTypeElement = screen.queryByTestId('request-type');
        expect(requestTypeElement).toBeInTheDocument();
        expect(requestTypeElement?.textContent).toEqual('POST');
    });

    test('Should refresh shared accounts - failed', async () => {
        window.fetch = jest.fn().mockResolvedValueOnce({
            json: async () => {
                throw new Error('test failed');
            },
            status: 200,
        });
        render(
            <Provider store={store}>
                <Product
                    product={'refresh_accounts'}
                    requestData={requestData}
                />
            </Provider>
        );
        await act(() => fireEvent.click(screen.getByTestId('send-request')));
        const requestTypeElement = screen.queryByTestId('request-type');
        expect(requestTypeElement).toBeInTheDocument();
        expect(requestTypeElement?.textContent).toEqual('POST');
    });

    test('Should toggle display data', async () => {
        window.fetch = jest.fn().mockResolvedValue({
            json: async () => {
                return {
                    accounts,
                };
            },
            status: 200,
        });

        render(
            <Provider store={store}>
                <Product product={'accounts'} requestData={requestData} />
            </Provider>
        );
        await act(() => fireEvent.click(screen.getByTestId('send-request')));
        await act(() => fireEvent.click(screen.getByTestId('json')));
        const requestTypeElement = screen.queryByTestId('request-type');
        expect(requestTypeElement).toBeInTheDocument();
        expect(requestTypeElement?.textContent).toEqual('GET');
    });

    test('Should render product with account drop down', async () => {
        render(
            (
                <Provider store={store}>
                    <Product
                        product={'transactions'}
                        requestData={requestData}
                    />
                </Provider>
            ) as React.ReactElement
        );
        const reportSelectElement = screen.queryByTestId('account-select');
        expect(reportSelectElement).toBeInTheDocument();

        let selectElement = screen.getByText(
            requestData.accountDisplayNames[0]
        );
        await act(() => userEvent.click(selectElement));

        let selectElementoption = await screen.findByText(
            requestData.accountDisplayNames[1]
        );
        await act(() => userEvent.click(selectElementoption));

        await screen.findByText(requestData.accountDisplayNames[1]);

        selectElement = screen.getByText(requestData.accountDisplayNames[1]);
        await act(() => userEvent.click(selectElement));

        selectElementoption = await screen.findByText(
            requestData.accountDisplayNames[2]
        );
        await act(() => userEvent.click(selectElementoption));

        await screen.findByText(requestData.accountDisplayNames[2]);
        expect(reportSelectElement).toBeInTheDocument();
    });
});
