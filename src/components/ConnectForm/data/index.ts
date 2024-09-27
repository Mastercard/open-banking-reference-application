const data = {
    url: {
        generateAppToken: '/aggregation/v2/partners/authentication',
        activateCustomer: '/aggregation/v2/customers/testing',
        generateConnectUrl: '/connect/v2/generate',
        createConsumer: '/decisioning/v1/customers/<customerId>/consumer',
        refreshAccounts:
            '/aggregation/v1/customers/<customerId>/institutionLogins/<institutionLoginId>/accounts',
    },
    body: {
        createConsumer: JSON.stringify({
            firstName: 'Homer',
            lastName: 'Loanseeker',
            address: '123 FAKE ST',
            city: 'OGDEN',
            state: 'UT',
            zip: '84401',
            phone: '1-800-986-3343',
            ssn: '999601111',
            birthday: {
                year: 1970,
                month: 7,
                dayOfMonth: 4,
            },
            email: 'myname@mycompany.com',
            suffix: 'Mr.',
        }),
        activateCustomer: JSON.stringify({
            firstName: 'John',
            lastName: 'Smith',
            email: `john_smith_${Date.now()}@domain.com`,
            phone: '6786786786',
        }),
    },
    fixedAccordions: ['panel0', 'panel1'],
    accordions: [
        {
            id: 'panel0',
            title: 'CREATE CUSTOMER',
            content: '',
            nextId: 'panel1',
        },
        {
            id: 'panel1',
            title: 'CONNECT BANK ACCOUNT',
            content: '',
            nextId: 'panel2',
        },
        {
            id: 'panel2',
            title: 'ACCOUNT INFORMATION',
            content: '',
            nextId: 'panel3',
        },
        {
            id: 'panel3',
            title: 'USE CASES',
            content: '',
            nextId: 'panel4',
        },
    ],
};

export default data;
