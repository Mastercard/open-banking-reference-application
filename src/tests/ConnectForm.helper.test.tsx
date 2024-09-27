import {
    activateCustomer,
    generateConnectUrl,
    createConsumer,
    getAccounts,
} from '../components/ConnectForm/helper';

import requestData from './Mocks/request-data';
import accountsData from './Mocks/accounts-data';

describe('Testing connect form helper', () => {
    describe('Testing activateCustomer', () => {
        test('Should activate customer', async () => {
            window.fetch = jest.fn().mockResolvedValue({
                json: async () => {
                    return {
                        customerId: '1234567890',
                    };
                },
                status: 200,
            });
            const result = await activateCustomer('johnsmith', requestData);
            expect(result.customerId).toEqual('1234567890');
        });
    });

    describe('Testing generateConnectUrl ', () => {
        test('Should generate connect url', async () => {
            window.fetch = jest.fn().mockResolvedValue({
                json: async () => {
                    return {
                        link: 'https://www.connecturl.com',
                    };
                },
                status: 200,
            });
            const link = await generateConnectUrl(requestData);
            expect(link).toEqual('https://www.connecturl.com');
        });
    });

    describe('Testing createConsumer  ', () => {
        test('Should create consumer ', async () => {
            window.fetch = jest.fn().mockResolvedValue({
                json: async () => {
                    return {
                        consumerId: '1234567890',
                    };
                },
                status: 200,
            });
            const result = await createConsumer(requestData);
            expect(result.consumerId).toEqual('1234567890');
        });
    });

    describe('Testing getAccounts   ', () => {
        test('Should get accounts ', async () => {
            window.fetch = jest.fn().mockResolvedValue({
                json: async () => {
                    return {
                        accounts: accountsData,
                    };
                },
                status: 200,
            });
            const result = await getAccounts(requestData);
            expect(result.accounts[0].realAccountNumberLast4).toEqual('0001');
            expect(result.accounts[0].name).toEqual('Transaction');
        });
    });
});
