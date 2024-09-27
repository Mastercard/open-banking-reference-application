const requestBody = {
    reportCustomFields: [
        {
            label: 'loanID',
            value: 123456,
            shown: true,
        },
        {
            label: 'loanID',
            value: 123456,
            shown: true,
        },
    ],
    incomeStreamConfidenceMinimum: 50,
};

const requestBodyWithPayroll = {
    ...requestBody,
    payrollData: {
        ssn: '999601111',
        dob: 15983999,
    },
};

const data = {
    text: {
        accountError:
            'None of the shared accounts are supported for selected report type.',
        waitForReport: 'Please wait while the report is generating.',
    },
    reports: [
        {
            name: 'Verification of Assets',
            requestType: 'POST',
            identifier: 'voa',
            shortName: 'VOA',
            api: '/decisioning/v2/customers/<customerId>/voa',
            body: JSON.stringify(requestBody),
        },
        {
            name: 'Verification of Income',
            requestType: 'POST',
            identifier: 'voi',
            shortName: 'VOI',
            api: '/decisioning/v2/customers/<customerId>/voi',
            body: JSON.stringify(requestBody),
        },
        {
            name: 'Verification of Assets with Income - Transactions',
            requestType: 'POST',
            identifier: 'voait',
            shortName: 'Verification of Assets with Income - Transactions',
            api: '/decisioning/v2/customers/<customerId>/voaHistory',
            body: JSON.stringify(requestBody),
        },
        {
            name: 'Verification of Income and Employment - Payroll',
            requestType: 'POST',
            identifier: 'voiep',
            shortName: 'Verification of Income and Employment - Payroll',
            api: '/decisioning/v2/customers/<customerId>/voiePayroll',
            body: JSON.stringify(requestBodyWithPayroll),
        },
        {
            name: 'Verification of Income and Employment - Paystub',
            requestType: 'POST',
            identifier: 'voieptx',
            shortName: 'Verification of Income and Employment - Paystub',
            api: '/decisioning/v2/customers/<customerId>/voieTxVerify/withInterview',
            body: JSON.stringify(requestBody),
        },
        {
            name: 'Verification of Employment - Payroll',
            requestType: 'POST',
            identifier: 'voep',
            shortName: 'Verification of Employment - Payroll',
            api: '/decisioning/v2/customers/<customerId>/voePayroll',
            body: JSON.stringify(requestBodyWithPayroll),
        },
        {
            name: 'Verification of Employment - Transactions',
            requestType: 'POST',
            identifier: 'voet',
            shortName: 'Verification of Employment - Transactions',
            api: '/decisioning/v2/customers/<customerId>/voeTransactions',
            body: JSON.stringify(requestBody),
        },
        {
            name: 'Prequalification CRA Report',
            requestType: 'POST',
            identifier: 'pcra',
            shortName: 'Prequalification Non-CRA Report',
            api: '/decisioning/v2/customers/<customerId>/preQualVoa',
            body: JSON.stringify(requestBody),
        },
        {
            name: 'Prequalification Non-CRA Report',
            requestType: 'POST',
            identifier: 'pncra',
            shortName: 'Prequalification Non-CRA Report',
            api: '/decisioning/v2/customers/<customerId>/assetSummary',
            body: JSON.stringify(requestBody),
        },
        {
            name: 'Transaction Credit Reporting Agency',
            requestType: 'POST',
            identifier: 'tcra',
            shortName: 'Transaction Credit Reporting Agency',
            api: '/decisioning/v2/customers/<customerId>/transactions',
            body: JSON.stringify(requestBody),
        },
        {
            name: 'Cash Flow Report',
            requestType: 'POST',
            identifier: 'cfr',
            shortName: 'cash flow',
            api: '/decisioning/v2/customers/<customerId>/cashFlowBusiness',
            body: JSON.stringify(requestBody),
        },
        {
            name: 'Balance Analytics Report',
            requestType: 'POST',
            identifier: 'bar',
            shortName: 'balance analytics',
            api: '/analytics/balance/v1/customer/<customerId>',
            body: JSON.stringify({}),
        },
        {
            name: 'Cash Flow Analytics Report',
            requestType: 'POST',
            identifier: 'cfar',
            shortName: 'cash flow analytics',
            api: '/analytics/cashflow/v1/customer/<customerId>',
            body: JSON.stringify({}),
        },
    ],
    url: {
        getReportStatus: '/decisioning/v1/customers/<customerId>/reports',
        getReport:
            '/decisioning/v4/customers/<customerId>/reports/<reportId>?onBehalfOf=Some entity&purpose=99',
        getAnalyticsReport: '/analytics/data/v1/<reportId>',
        payStatements: '/aggregation/v1/customers/<customerId>/payStatements',
    },
};

export default data;
