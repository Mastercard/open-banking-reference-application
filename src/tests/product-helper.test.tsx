import { proccessSendRequest } from '../components/Product/helper';

describe('getAccountsInformation', () => {
    it('should return tableData and response when identifier is accounts', async () => {
        const product = {
            name: 'Accounts',
            identifier: 'accounts',
            type: 'pay',
            requestType: 'GET',
            description: ' Get a list of shared accounts and their properties.',
            api: '/aggregation/v1/customers/<customerId>/institutionLogins/<institutionLoginId>/accounts',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/?view=api#GetCustomerAccountsByInstitutionLogin',
            columns: [
                {
                    accessorKey: 'id',
                    header: 'ID',
                },
                {
                    accessorKey: 'name',
                    header: 'Name ',
                },
                {
                    accessorKey: 'type',
                    header: 'Type',
                },
                {
                    accessorKey: 'balance',
                    header: 'Balance',
                },
                {
                    accessorKey: 'currency',
                    header: 'Currency',
                },
            ],
        };
        const requestData = { userId: 123 };

        window.fetch = jest.fn().mockResolvedValue({
            json: async () => {
                return {
                    accounts: [
                        {
                            id: '15522609',
                            number: '8000008888',
                            accountNumberDisplay: '8888',
                            name: 'Auto Loan',
                            balance: -903.02,
                            type: 'loan',
                            status: 'active',
                            customerId: '2519572',
                            institutionId: '200000',
                            balanceDate: 1725357744,
                            createdDate: 1725357744,
                            lastUpdatedDate: 1725393749,
                            currency: 'AUD',
                            institutionLoginId: 2366461,
                            displayPosition: 1,
                            financialinstitutionAccountStatus: 'OPEN',
                            accountNickname: 'Auto Loan',
                            marketSegment: 'personal',
                        },
                    ],
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(product, requestData);
        expect(result.tableData[0].id).toEqual('15522609');
    });

    it('should return tableData and response when identifier is refresh-accounts', async () => {
        const product = {
            name: 'Refresh Accounts',
            identifier: 'refresh_accounts',
            type: 'manage',
            requestType: 'POST',
            description:
                'Refresh accounts for given institutionLoginId to fetch the latest transaction data.',
            api: '/aggregation/v1/customers/<customerId>/institutionLogins/<institutionLoginId>/accounts',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/#RefreshCustomerAccountsByInstitutionLogin',
        };
        const requestData = { userId: 123 };

        window.fetch = jest.fn().mockResolvedValue({
            json: async () => {
                return {
                    accounts: [
                        {
                            id: '15522609',
                            number: '8000008888',
                            accountNumberDisplay: '8888',
                            name: 'Auto Loan',
                            balance: -903.13,
                            type: 'loan',
                            aggregationStatusCode: 0,
                            status: 'active',
                            customerId: '2519572',
                            institutionId: '200000',
                            balanceDate: 1725358407,
                            aggregationSuccessDate: 1725358408,
                            aggregationAttemptDate: 1725358408,
                            createdDate: 1725357744,
                            lastUpdatedDate: 1725393749,
                            currency: 'AUD',
                            lastTransactionDate: 1725358407,
                            institutionLoginId: 2366461,
                            displayPosition: 1,
                            financialinstitutionAccountStatus: 'OPEN',
                            accountNickname: 'Auto Loan',
                            marketSegment: 'personal',
                        },
                        {
                            id: '15522613',
                            number: '8000006666',
                            accountNumberDisplay: '6666',
                            name: 'Line of Credit',
                            balance: -903.13,
                            type: 'lineOfCredit',
                            aggregationStatusCode: 0,
                            status: 'active',
                            customerId: '2519572',
                            institutionId: '200000',
                            balanceDate: 1725358407,
                            aggregationSuccessDate: 1725358408,
                            aggregationAttemptDate: 1725358408,
                            createdDate: 1725357744,
                            lastUpdatedDate: 1725393749,
                            currency: 'AUD',
                            lastTransactionDate: 1725358407,
                            institutionLoginId: 2366461,
                            detail: {
                                interestRate: '4.5',
                                creditAvailableAmount: 799.99,
                                paymentMinAmount: 1.0,
                                statementCloseBalance: -903.13,
                                locPrincipalBalance: 20010.0,
                                statementEndDate: 1725148800,
                                paymentDueDate: 1725840000,
                            },
                            displayPosition: 2,
                            financialinstitutionAccountStatus: 'OPEN',
                            accountNickname: 'Line of Credit',
                            marketSegment: 'personal',
                        },
                    ],
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(product, requestData);
        expect(result.accounts.length).toEqual(2);
    });

    it('should return tableData and response when identifier is transactions', async () => {
        const product = {
            name: 'Transactions',
            identifier: 'transactions',
            type: 'pay',
            requestType: 'GET',
            description: 'Get a list of transactions for given account. ',
            api: '/aggregation/v3/customers/<customerId>/accounts/<accountId>/transactions?sort=desc&fromDate=<startDate>&toDate=<endDate>',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/?view=api#GetCustomerAccountTransactions',
            columns: [
                {
                    accessorKey: 'date',
                    header: 'Date',
                },
                {
                    accessorKey: 'description',
                    header: 'Description',
                },
                {
                    accessorKey: 'amount',
                    header: 'Amount',
                },
                {
                    accessorKey: 'currency',
                    header: 'Currency',
                },
            ],
        };
        const requestData = {
            accountData: [
                {
                    id: '15522609',
                    number: '8000008888',
                    accountNumberDisplay: '8888',
                    name: 'Auto Loan',
                    balance: -903.13,
                    type: 'loan',
                    aggregationStatusCode: 0,
                    status: 'active',
                    customerId: '2519572',
                    institutionId: '200000',
                    balanceDate: 1725358407,
                    aggregationSuccessDate: 1725358408,
                    aggregationAttemptDate: 1725358408,
                    createdDate: 1725357744,
                    lastUpdatedDate: 1725393749,
                    currency: 'AUD',
                    lastTransactionDate: 1725358407,
                    institutionLoginId: 2366461,
                    displayPosition: 1,
                    financialinstitutionAccountStatus: 'OPEN',
                    accountNickname: 'Auto Loan',
                    marketSegment: 'personal',
                },
            ],
            currentAccount: {
                id: '15522609',
                number: '8000008888',
                accountNumberDisplay: '8888',
                name: 'Auto Loan',
                balance: -903.13,
                type: 'loan',
                aggregationStatusCode: 0,
                status: 'active',
                customerId: '2519572',
                institutionId: '200000',
                balanceDate: 1725358407,
                aggregationSuccessDate: 1725358408,
                aggregationAttemptDate: 1725358408,
                createdDate: 1725357744,
                lastUpdatedDate: 1725393749,
                currency: 'AUD',
                lastTransactionDate: 1725358407,
                institutionLoginId: 2366461,
                displayPosition: 1,
                financialinstitutionAccountStatus: 'OPEN',
                accountNickname: 'Auto Loan',
                marketSegment: 'personal',
            },
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

    it('should return tableData and response when identifier is account_owner_details', async () => {
        const product = {
            name: 'Account owner details',
            identifier: 'account_owner_details',
            type: 'pay',
            requestType: 'GET',
            description:
                'Retrieve account owner details from a financial institution.',
            api: '/aggregation/v3/customers/<customerId>/accounts/<accountId>/owner',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/?view=api#GetAccountOwnerDetails',
            columns: [
                {
                    accessorKey: 'id',
                    header: 'Account Id',
                },
                {
                    accessorKey: 'name',
                    header: 'Account Owner Name',
                },
                {
                    accessorKey: 'address',
                    header: 'Account Owner Address',
                },
            ],
        };
        const requestData = {
            accountData: [
                {
                    id: '15522609',
                    number: '8000008888',
                    accountNumberDisplay: '8888',
                    name: 'Auto Loan',
                    balance: -903.13,
                    type: 'loan',
                    aggregationStatusCode: 0,
                    status: 'active',
                    customerId: '2519572',
                    institutionId: '200000',
                    balanceDate: 1725358407,
                    aggregationSuccessDate: 1725358408,
                    aggregationAttemptDate: 1725358408,
                    createdDate: 1725357744,
                    lastUpdatedDate: 1725393749,
                    currency: 'AUD',
                    lastTransactionDate: 1725358407,
                    institutionLoginId: 2366461,
                    displayPosition: 1,
                    financialinstitutionAccountStatus: 'OPEN',
                    accountNickname: 'Auto Loan',
                    marketSegment: 'personal',
                },
            ],
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
        expect(result.tableData.length).toEqual(1);
    });

    it('should return tableData and response when identifier is account_ach_details', async () => {
        const product = {
            name: 'Account ACH Details',
            identifier: 'account_ach_details',
            type: 'pay',
            requestType: 'GET',
            description:
                'Get the account number and account ach details that can be used for, e.g., payment initiation. Only Transaction & Savings account types are supported.',
            api: '/aggregation/v1/customers/<customerId>/accounts/<accountId>/details',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/?view=api#GetAccountACHDetails',
            error: {
                accountError:
                    'None of the shared accounts are supported for account ach Details product.',
            },
            columns: [
                {
                    accessorKey: 'id',
                    header: 'Account Id',
                },
                {
                    accessorKey: 'accountNumber',
                    header: 'Account Number',
                },
                {
                    accessorKey: 'routingNumber',
                    header: 'Routing Number',
                },
            ],
        };
        const requestData = {
            accountData: [
                {
                    id: '15522609',
                    number: '8000008888',
                    accountNumberDisplay: '8888',
                    name: 'Auto Loan',
                    balance: -903.13,
                    type: 'savings',
                    aggregationStatusCode: 0,
                    status: 'active',
                    customerId: '2519572',
                    institutionId: '200000',
                    balanceDate: 1725358407,
                    aggregationSuccessDate: 1725358408,
                    aggregationAttemptDate: 1725358408,
                    createdDate: 1725357744,
                    lastUpdatedDate: 1725393749,
                    currency: 'AUD',
                    lastTransactionDate: 1725358407,
                    institutionLoginId: 2366461,
                    displayPosition: 1,
                    financialinstitutionAccountStatus: 'OPEN',
                    accountNickname: 'Auto Loan',
                    marketSegment: 'personal',
                },
            ],
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

    it('should return tableData and response when identifier is available_balance', async () => {
        const product = {
            name: 'Available balance - Live',
            identifier: 'available_balance',
            type: 'pay',
            requestType: 'GET',
            description:
                'Retrieves the latest account balances for a single account in real-time directly from a financial institution. Only Transaction & Savings and Term Deposit account types are supported.',
            api: '/aggregation/v1/customers/<customerId>/accounts/<accountId>/availableBalance/live',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/?view=api#GetAvailableBalanceLive',
            error: {
                accountError:
                    'None of the shared accounts are supported for Available Balance Live product.',
            },
            columns: [
                {
                    accessorKey: 'id',
                    header: 'Account Id',
                },
                {
                    accessorKey: 'accountNumber',
                    header: 'Account Number',
                },
                {
                    accessorKey: 'availableBalance',
                    header: 'Available Balance',
                },
                {
                    accessorKey: 'currency',
                    header: 'Currency',
                },
            ],
        };
        const requestData = {
            accountData: [
                {
                    id: '15522609',
                    number: '8000008888',
                    accountNumberDisplay: '8888',
                    name: 'Auto Loan',
                    balance: -903.13,
                    type: 'savings',
                    aggregationStatusCode: 0,
                    status: 'active',
                    customerId: '2519572',
                    institutionId: '200000',
                    balanceDate: 1725358407,
                    aggregationSuccessDate: 1725358408,
                    aggregationAttemptDate: 1725358408,
                    createdDate: 1725357744,
                    lastUpdatedDate: 1725393749,
                    currency: 'AUD',
                    lastTransactionDate: 1725358407,
                    institutionLoginId: 2366461,
                    displayPosition: 1,
                    financialinstitutionAccountStatus: 'OPEN',
                    accountNickname: 'Auto Loan',
                    marketSegment: 'personal',
                },
            ],
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

    it('should checkForAccountError', async () => {
        const product = {
            name: 'Available balance - Live',
            identifier: 'available_balance',
            type: 'pay',
            requestType: 'GET',
            description:
                'Retrieves the latest account balances for a single account in real-time directly from a financial institution. Only Transaction & Savings and Term Deposit account types are supported.',
            api: '/aggregation/v1/customers/<customerId>/accounts/<accountId>/availableBalance/live',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/?view=api#GetAvailableBalanceLive',
            error: {
                accountError:
                    'None of the shared accounts are supported for Available Balance Live product.',
            },
            columns: [
                {
                    accessorKey: 'id',
                    header: 'Account Id',
                },
            ],
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
            expect(err.cause).toEqual('warning');
        }
    });

    it('should check for Invalid product', async () => {
        const product = {
            name: 'Available balance - Live',
            identifier: 'warning',
            type: 'pay',
            requestType: 'GET',
            description:
                'Retrieves the latest account balances for a single account in real-time directly from a financial institution. Only Transaction & Savings and Term Deposit account types are supported.',
            api: '/aggregation/v1/customers/<customerId>/accounts/<accountId>/availableBalance/live',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/?view=api#GetAvailableBalanceLive',
            error: {
                accountError:
                    'None of the shared accounts are supported for Available Balance Live product.',
            },
            columns: [
                {
                    accessorKey: 'id',
                    header: 'Account Id',
                },
            ],
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
