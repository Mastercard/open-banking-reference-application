import { proccessSendRequest } from '../components/Product/helper';
import data from '../components/Product/data/index';

import accounts from './Mocks/accounts-data';

describe('getAccountsInformation', () => {
    test('should return tableData and response when identifier is accounts', async () => {
        const product = data.products[0];
        const requestData = { userId: 123 };

        window.fetch = jest.fn().mockResolvedValue({
            json: async () => {
                return {
                    accounts,
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(product, requestData);
        expect(result.tableData[0].id).toEqual('15415575');
    });

    test('should return tableData and response when identifier is refresh-accounts', async () => {
        const product = data.products[1];
        const requestData = { userId: 123 };

        window.fetch = jest.fn().mockResolvedValue({
            json: async () => {
                return {
                    accounts,
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(product, requestData);
        expect(result.accounts.length).toEqual(6);
    });

    test('should return tableData and response when identifier is transactions', async () => {
        const product = data.products[2];
        const requestData = {
            accountData: accounts,
            currentAccount: accounts[0],
        };

        window.fetch = jest.fn().mockResolvedValue({
            json: async () => {
                return {
                    found: 7,
                    displaying: 7,
                    moreAvailable: 'false',
                    fromDate: '1722682119',
                    toDate: '1725360519',
                    sort: 'desc',
                    transactions: [
                        {
                            id: 412745936,
                            amount: 100.0,
                            accountId: 15522609,
                            customerId: 2519572,
                            status: 'active',
                            description: 'Funds Transfer Loan repay',
                            institutionTransactionId: '0000000000',
                            postedDate: 1723982400,
                            transactionDate: 1723982400,
                            createdDate: 1725394407,
                        },
                    ],
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(product, requestData);
        expect(result.tableData.length).toEqual(1);
    });

    test('should return tableData and response when identifier is account_owner_details', async () => {
        const product = data.products[5];
        const requestData = {
            accountData: accounts,
        };

        window.fetch = jest.fn().mockResolvedValue({
            json: async () => {
                return {
                    holders: [
                        {
                            ownerName: 'FRED NURK',
                            addresses: [
                                {
                                    ownerAddress:
                                        '72 CHRISTIE STREET ST. LEONARDS, NSW 2065',
                                },
                            ],
                        },
                    ],
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(product, requestData);
        expect(result.tableData.length).toEqual(6);
    });

    test('should return tableData and response when identifier is account_ach_details', async () => {
        const product = data.products[3];
        const requestData = {
            accountData: accounts,
        };

        window.fetch = jest.fn().mockResolvedValue({
            json: async () => {
                return {
                    found: 7,
                    displaying: 7,
                    moreAvailable: 'false',
                    fromDate: '1722682119',
                    toDate: '1725360519',
                    sort: 'desc',
                    transactions: [
                        {
                            id: 412745936,
                            amount: 100.0,
                            accountId: 15522609,
                            customerId: 2519572,
                            status: 'active',
                            description: 'Funds Transfer Loan repay',
                            institutionTransactionId: '0000000000',
                            postedDate: 1723982400,
                            transactionDate: 1723982400,
                            createdDate: 1725394407,
                        },
                    ],
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(product, requestData);
        expect(result.tableData.length).toEqual(1);
    });

    test('should return tableData and response when identifier is available_balance', async () => {
        const product = data.products[4];
        const requestData = {
            accountData: accounts,
        };

        window.fetch = jest.fn().mockResolvedValue({
            json: async () => {
                return {
                    found: 7,
                    displaying: 7,
                    moreAvailable: 'false',
                    fromDate: '1722682119',
                    toDate: '1725360519',
                    sort: 'desc',
                    transactions: [
                        {
                            id: 412745936,
                            amount: 100.0,
                            accountId: 15522609,
                            customerId: 2519572,
                            status: 'active',
                            description: 'Funds Transfer Loan repay',
                            institutionTransactionId: '0000000000',
                            postedDate: 1723982400,
                            transactionDate: 1723982400,
                            createdDate: 1725394407,
                        },
                    ],
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(product, requestData);
        expect(result.tableData.length).toEqual(2);
    });

    test('should checkForAccountError', async () => {
        const product = data.products[4];
        const requestData = {
            accountData: [
                {
                    id: '15522609',
                },
            ],
        };
        try {
            await proccessSendRequest(product, requestData);
        } catch (err: any) {
            expect(err.cause).toEqual('warning');
        }
    });

    test('should check for Invalid product', async () => {
        const product = {
            name: 'new product',
            identifier: 'new_product',
        };
        const requestData = {
            accountData: [
                {
                    id: '15522609',
                },
            ],
        };
        try {
            await proccessSendRequest(product, requestData);
        } catch (err: any) {
            expect(err.message).toEqual('Invalid product');
        }
    });
});
