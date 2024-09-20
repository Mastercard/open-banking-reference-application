import { act, render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import { Lend } from '../components/Usecases/components';
import data from '../components/Usecases/components/Lend/data';

import store from '../store';

import requestData from './Mocks/request-data';
import userEvent from '@testing-library/user-event';

describe('Testing manage component', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears the cache
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restores all mocks to their original implementation
        jest.resetAllMocks();
    });

    test('should render manage component', () => {
        render(
            <Provider store={store}>
                <Lend requestData={requestData} />
            </Provider>
        );
        expect(screen.getByTestId('lend')).toBeInTheDocument();
    });

    test('should fetch report', async () => {
        window.fetch = jest.fn().mockResolvedValue({
            json: async () => {
                return {
                    id: '123',
                    reportId: ' qwertyuiop',
                    status: 'success',
                    reports: [
                        {
                            id: 'qwertyuiop',
                            reportId: ' qwertyuiop',
                            status: 'success',
                        },
                    ],
                };
            },
            blob: async () => {
                return 'data';
            },
            status: 200,
        });
        render(
            <Provider store={store}>
                <Lend requestData={requestData} />
            </Provider>
        );
        const generateReportElement =
            await screen.findByTestId('generate-report');
        expect(generateReportElement).toBeInTheDocument();
        await act(() => fireEvent.click(generateReportElement));
    });

    test('should fetch paystub', async () => {
        window.fetch = jest.fn().mockResolvedValue({
            json: async () => {
                return {
                    id: 'qwertyuiop',
                    reportId: ' qwertyuiop',
                    status: 'success',
                    assetId: '12345678',
                    reports: [
                        {
                            id: 'qwertyuiop',
                            reportId: ' qwertyuiop',
                            status: 'success',
                        },
                    ],
                };
            },
            blob: async () => {
                return 'data';
            },
            status: 200,
        });
        render(
            <Provider store={store}>
                <Lend requestData={requestData} />
            </Provider>
        );
        const selectElement = screen.getByRole('combobox');
        await act(() => userEvent.click(selectElement));
        const selectElementoption = await screen.findByText(
            'Verification of Income and Employment - Paystub'
        );
        await act(() => userEvent.click(selectElementoption));
        const generateReportElement =
            await screen.findByTestId('generate-report');
        expect(generateReportElement).toBeInTheDocument();
        await act(() => fireEvent.click(generateReportElement));
    });

    test('should fetch analytics', async () => {
        window.fetch = jest.fn().mockResolvedValue({
            json: async () => {
                return {
                    id: 'qwertyuiop',
                    reportId: ' qwertyuiop',
                    status: 'success',
                    reports: [
                        {
                            id: 'qwertyuiop',
                            reportId: ' qwertyuiop',
                            status: 'success',
                        },
                    ],
                };
            },
            blob: async () => {
                return 'data';
            },
            status: 200,
        });
        render(
            <Provider store={store}>
                <Lend requestData={requestData} />
            </Provider>
        );
        const selectElement = screen.getByRole('combobox');
        await act(() => userEvent.click(selectElement));

        const selectElementoption = await screen.findByText(
            data.reports[12].name
        );
        await act(() => userEvent.click(selectElementoption));
        const generateReportElement =
            await screen.findByTestId('generate-report');
        expect(generateReportElement).toBeInTheDocument();
        await act(() => fireEvent.click(generateReportElement));
    });

    test('should download json report', async () => {
        render(
            <Provider store={store}>
                <Lend requestData={requestData} />
            </Provider>
        );
        const generateReportElement =
            await screen.findByTestId('json-download');
        await act(() => fireEvent.click(generateReportElement));
        expect(screen.getByTestId('json-download')).toBeInTheDocument();
    });

    test('should download pdf report', async () => {
        window.URL.createObjectURL = jest.fn().mockReturnValueOnce('data');
        render(
            <Provider store={store}>
                <Lend requestData={requestData} />
            </Provider>
        );
        const generateReportElement = await screen.findByTestId('pdf-download');
        await act(() => fireEvent.click(generateReportElement));
        expect(screen.getByTestId('pdf-download')).toBeInTheDocument();
    });

    test('should download pdf report', async () => {
        window.URL.createObjectURL = jest.fn().mockReturnValueOnce('data');
        render(
            <Provider store={store}>
                <Lend requestData={requestData} />
            </Provider>
        );

        const selectElement = screen.getByRole('combobox');
        await act(() => userEvent.click(selectElement));

        const selectElementoption = await screen.findByText(
            data.reports[1].name
        );
        await act(() => userEvent.click(selectElementoption));

        await screen.findByText('Generate report');
        expect(
            screen.getByRole('button', {
                name: 'Generate report',
            })
        ).toBeInTheDocument();
    });
});
