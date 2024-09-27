import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { Usecases } from '../components';
import store from '../store';

import requestData from './Mocks/request-data';
import userEvent from '@testing-library/user-event';

describe('Testing usecases component', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears the cache
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restores all mocks to their original implementation
        jest.resetAllMocks();
    });
    test('Should render usecase component', async () => {
        render(
            <Provider store={store}>
                <Usecases requestData={requestData} />
            </Provider>
        );
        expect(screen.getByTestId('usecases')).toBeInTheDocument();

        const generate = await screen.findByTestId('generate-report');
        await userEvent.click(generate);
        await userEvent.click(await screen.findByText('Manage'));
    });

    test('Should render usecase component and validate handleReportChangeTabs', async () => {
        jest.mock('../components/Usecases/components/Lend/helper', () => {
            return {
                submitReport: jest.fn(() => {
                    setTimeout(() => 'timeout', 3);
                }),
            };
        });
        render(
            <Provider store={store}>
                <Usecases requestData={requestData} />
            </Provider>
        );
        expect(screen.getByTestId('usecases')).toBeInTheDocument();

        const generate = await screen.findByTestId('generate-report');
        userEvent.click(generate);
        await userEvent.click(await screen.findByText('Manage'));
        await userEvent.click(await screen.findByText('Pay'));
    });
});
