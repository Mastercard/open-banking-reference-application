const data = {
    products: [
        {
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
        },
        {
            name: 'Refresh Accounts',
            identifier: 'refresh_accounts',
            type: 'manage',
            requestType: 'POST',
            description:
                'Refresh accounts for given institutionLoginId to fetch the latest transaction data.',
            api: '/aggregation/v1/customers/<customerId>/institutionLogins/<institutionLoginId>/accounts',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/#RefreshCustomerAccountsByInstitutionLogin',
        },
        {
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
        },
        {
            name: 'Account ACH Details',
            identifier: 'account_ach_details',
            type: 'pay',
            requestType: 'GET',
            description:
                'Get the account number and and routing number details for an ACH payment. Only checking, savings and moneyMarket account types are supported.',
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
        },
        {
            name: 'Available balance - Live',
            identifier: 'available_balance',
            type: 'pay',
            requestType: 'GET',
            description:
                'Retrieves the latest account balances for a single account in real-time directly from a financial institution. Only checking, savings, moneyMarket and cd account types are supported.',
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
        },
        {
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
        },
        {
            name: 'Verification of Assets',
            identifier: 'voa',
            type: 'lend',
            requestType: 'POST',
            api: '/decisioning/v2/customers/<customerId>/voa',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/products/lend/voa/#generate-voa-report',
            description:
                'The Verification of Assets (VOA) report includes all bank accounts for an individual customer. It retrieves up to twelve months of transaction history for each account type that the customer has permissioned via Connect.',
        },
        {
            name: 'Verification of Income',
            identifier: 'voi',
            type: 'lend',
            requestType: 'POST',
            api: '/decisioning/v2/customers/<customerId>/voi',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/products/lend/voi/#generate-voi-report',
            description:
                'The Verification of Income (VOI) report analyzes both active and inactive income streams, and then ranks them with a confidence score. It retrieves up to 24 months of validated banking data for an individual customer, based on the accounts they have permissioned to access.',
        },
        {
            name: 'Verification of Assets with Income - Transactions',
            requestType: 'POST',
            identifier: 'voait',
            type: 'lend',
            shortName: 'Verification of Assets with Income - Transactions',
            api: '/decisioning/v2/customers/<customerId>/voaHistory',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/products/lend/lend-reports/#verification-of-assets-with-income---transactions',
            description:
                'Generate a Verification of Assets with Income (VOAI) report for all checking, savings, money market, and investment accounts for the given customer. This service retrieves up to 24 months of transaction history for each account and uses this information to generate the VOAI report. The report includes 1 - 6 months of all debit and credit transactions for asset verification. By default, the history is set to 61 days, however, you can change the transaction history in this section by setting the fromDate parameter. The report also includes up to 24 months of income credit transactions (ordered by account and confidence level) regardless of fromDate for income verification.',
        },
        {
            name: 'Verification of Income and Employment - Payroll',
            requestType: 'POST',
            identifier: 'voiep',
            type: 'lend',
            shortName: 'Verification of Income and Employment - Payroll',
            api: '/decisioning/v2/customers/<customerId>/voiePayroll',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/products/lend/lend-reports/#verification-of-income-and-employment---paystub-with-txverify',
            description:
                'Generate a VOIE - Paystub (with TXVerify) report for all checking and savings under the given customer. This service retrieves up to two years of transaction history for the given accounts. It then uses this information as well as the provided paystub(s), which are passed into the request body as asset IDs (generated using the Store Customer Pay Statement API) to generate the VOIE - Paystub (with TXVerify) report.',
        },
        {
            name: 'Verification of Employment - Payroll',
            requestType: 'POST',
            identifier: 'voep',
            type: 'lend',
            shortName: 'Verification of Employment - Payroll',
            api: '/decisioning/v2/customers/<customerId>/voePayroll',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/?view=api#GenerateCashFlowBusinessReport',
            description:
                "The Cash Flow report provides cash flow credit and debit information about customer's accounts. It retrieves up to 12 months of validated banking data for an individual customer, based on all accounts they have shared via Connect.",
        },
        {
            name: 'Verification of Income and Employment -  Paystub (with TXVerify)',
            requestType: 'POST',
            identifier: 'voieptx',
            shortName: 'Verification of Income and Employment -  Paystub (with TXVerify)',
            api: '/decisioning/v2/customers/<customerId>/voieTxVerify/withInterview',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/?view=api#GenerateCashFlowBusinessReport',
            description:
                "The Cash Flow report provides cash flow credit and debit information about customer's accounts. It retrieves up to 12 months of validated banking data for an individual customer, based on all accounts they have shared via Connect.",
        },
        {
            name: 'Verification of Employment - Transactions',
            requestType: 'POST',
            identifier: 'voet',
            type: 'lend',
            shortName: 'Verification of Employment - Transactions',
            api: '/decisioning/v2/customers/<customerId>/voeTransactions',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/products/lend/lend-reports/#verification-of-employment---transactions',
            description:
                'Retrieve the latest credit transaction information from the borrower\'s connected bank accounts and groups them into income streams so that you can view their payment history to ensure a direct deport was made within the expected cadence. The report displays transaction descriptions without any dollar amounts so that income re-verification isn\'t necessary.',
        },
        {
            name: 'Prequalification CRA Report',
            requestType: 'POST',
            identifier: 'pcra',
            type: 'lend',
            shortName: 'Prequalification Non-CRA Report',
            api: '/decisioning/v2/customers/<customerId>/preQualVoa',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/products/lend/lend-reports/#prequalification-cra-report',
            description:
                'Retrieve all checking, savings, money market, and investment accounts for a consumer. The account, owner information, and the number of insufficient funds (NSFs) for checking accounts are also provided.',
        },
        {
            name: 'Prequalification Non-CRA Report',
            requestType: 'POST',
            identifier: 'pncra',
            shortName: 'Prequalification Non-CRA Report',
            api: '/decisioning/v2/customers/<customerId>/assetSummary',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/products/lend/lend-reports/#prequalification-non-cra-report',
            description:
                'Retrieve all checking, savings, money market, and investment accounts for a customer. The account, owner information, and the number of insufficient funds (NSFs) for checking accounts are also provided.',
        },
        {
            name: 'Transaction Credit Reporting Agency',
            requestType: 'POST',
            identifier: 'tcra',
            type: 'lend',
            shortName: 'Transaction Credit Reporting Agency',
            api: '/decisioning/v2/customers/<customerId>/transactions',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/products/lend/lend-reports/#transaction-credit-reporting-agency',
            description:
                'Generate a Transaction Report for the given accounts under the given customer. This service retrieves up to 24 months of transaction history for the given customer. It then uses this information to generate the Transaction Report.',
        },
        {
            name: 'Cash Flow Report',
            identifier: 'cfr',
            type: 'lend',
            requestType: 'POST',
            api: '/decisioning/v2/customers/<customerId>/cashFlowBusiness',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/?view=api#GenerateCashFlowBusinessReport',
            description:
                "The Cash Flow report provides cash flow credit and debit information about customer's accounts. It retrieves up to 12 months of validated banking data for an individual customer, based on all accounts they have shared via Connect.",
        },
        {
            name: 'Balance Analytics Report',
            requestType: 'POST',
            identifier: 'bar',
            type: 'lend',
            shortName: 'balance analytics',
            api: '/analytics/balance/v1/customer/<customerId>',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/products/lend/balance-analytics',
            description:
                'Balance Analytics, enabled for a variety of use cases, evaluates a customer’s account balances to help identify risks and give insights to a financial decision. An aggregate view of all the accounts the customer has permissioned access to is provided in the report. This includes information such as average daily balance, current balance, available balances, and maximum and minimum balances over a specified time period up to 24 months.',
        },
        {
            name: 'Cash Flow Analytics Report',
            requestType: 'POST',
            identifier: 'cfar',
            type: 'lend',
            shortName: 'cash flow analytics',
            api: '/analytics/cashflow/v1/customer/<customerId>',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/products/lend/cash-flow-analytics/',
            description:
                'Cash Flow Analytics, enabled for a variety of use cases, evaluates a customer’s account balances to help identify risks and give insights to a financial decision. An aggregate view of all the accounts the customer has permissioned access to is provided in the report. This includes information such as current balance, transaction data, debits/credits, estimated revenue for businesses, deposits, withdrawals, and non-sufficient funds (NSFs) over a specified time period up to 24 months.',
        },

    ],
};

export default data;
