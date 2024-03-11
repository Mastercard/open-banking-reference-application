/* Configure App key, Partner ID and Partner Secret */
export const PARTNERID = process.env.REACT_APP_PARTNERID ?? '';
export const PARTNERSECRET = process.env.REACT_APP_SECRET ?? '';
export const APP_KEY = process.env.REACT_APP_KEY ?? '';

/* URL's  */
export const URL = {
    genTokenUrl: '/aggregation/v2/partners/authentication',
    activateCustomerUrl: '/aggregation/v2/customers/testing',
    genConnectUrl: '/connect/v2/generate',
    accountInfoUrl: '/aggregation/v1/customers/<customerId>/accounts',
    achUrl: '/aggregation/v1/customers/<customerId>/accounts/<accountId>/details',
};

/* DEPOSIT ACCOUNT TYPES FOR ACH  */
export const DEPOSIT_ACCOUNTS = ['checking', 'savings'];

/* Request body the fetch call */
export const REQUEST_BODY = {
    generateAppToken: {
        partnerId: PARTNERID,
        partnerSecret: PARTNERSECRET,
    },
    activateCustomer: {
        firstName: 'fastBasslance',
        lastName: 'TestingM122arch12',
    },
};

/* Stepper: All the steps and the respective text content are added here. */
export const STEPS = [
    {
        label: 'Create your first customer',
        description: (
            <div>
                Here, we start with creating a "testing" customer record. We
                will use this customer later with FinBank test profiles.
            </div>
        ),
        panel: 'panel0',
        documentationLink:
            'https://developer.mastercard.com/open-banking-us/documentation/quick-start-guide/#2-welcome-your-first-customer',
    },
    {
        label: 'Attach a bank account to customer',
        description: (
            <div>
                Now that you have created a customer, the next step is to
                generate a Connect URL. That is needed to start a Connect
                session and grant Mastercard Open Banking access to their
                accounts and financial data.
            </div>
        ),
        panel: 'panel1',
        documentationLink:
            'https://developer.mastercard.com/open-banking-us/documentation/connect/',
    },
    {
        label: 'Pull account information',
        description: (
            <div>
                <div className='mt-2'>
                    We are now interested in retrieving some of the most recent
                    information about the accounts. For that, we call the{' '}
                    <b className='text-[14px]'>Refresh Customer Accounts </b>{' '}
                    endpoint.
                </div>
            </div>
        ),
        panel: 'panel2',
        documentationLink:
            'https://developer.mastercard.com/open-banking-us/documentation/quick-start-guide/#step-5---refresh-customer-accounts',
    },
];

/* Accordion: The title is configured here, the content will be added at the run time */
export const ACCORDIANS = [
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
];

export const PANELS = ['panel0', 'panel1', 'panel2'];
export const ACHTEXT =
    'Return the real account number and routing number details for an ACH payment.';
export const AVAILBTEXT = `Retrieve the latest cached available & cleared account balances for a customer. Since we update & store balances throughout the day,
this is the most accurate balance information available when a connection to a financial institution is unavailable or when a faster response is needed. Only deposit account types are supported: Checking, Savings, Money Market, and CD.`;
