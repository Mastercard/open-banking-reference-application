import { Fragment } from 'react';
export const Steps = [
    {
        label: 'Add your first customer',
        description: (
            <div>
                Start with creating a "testing" customer whose financial data
                will be requested. To learn more,{' '}
                <span>
                    see{' '}
                    <a
                        rel='noreferrer'
                        href='https://developer.mastercard.com/open-banking-us/documentation/quick-start-guide/#2-welcome-your-first-customer'
                        target='_blank'
                    >
                        <b>Customers.</b>
                    </a>
                </span>
            </div>
        ),
        panel: 'panel0',
        documentationLink:
            'https://developer.mastercard.com/open-banking-us/documentation/quick-start-guide/#2-welcome-your-first-test-customer',
    },
    {
        label: 'Obtain access to the customer’s accounts',
        description: (
            <Fragment>
                <div>
                    Having created a customer, the next step is to generate a
                    Connect URL to launch the Connect application.
                </div>
                <br />
                <div>
                    The Connect application allows customers to select accounts
                    they want to share. To learn more,{' '}
                    <span>
                        see{' '}
                        <a
                            rel='noreferrer'
                            href='https://developer.mastercard.com/open-banking-us/documentation/connect/'
                            target='_blank'
                        >
                            <b>Connect Application</b>
                        </a>
                    </span>
                </div>
            </Fragment>
        ),
        panel: 'panel1',
        documentationLink:
            'https://developer.mastercard.com/open-banking-us/documentation/connect/integrating/',
    },
    {
        label: 'Pull account information',
        description: (
            <div>
                <div className='mt-2'>
                    Now you can retrieve some of the latest data from the shared
                    accounts. For that, call the{' '}
                    <span>
                        <a
                            rel='noreferrer'
                            href='https://developer.mastercard.com/open-banking-us/documentation/api-reference/#GetCustomerAccounts'
                            target='_blank'
                        >
                            <b> Get Customer Accounts</b>
                        </a>
                    </span>{' '}
                    endpoint.
                </div>
            </div>
        ),
        panel: 'panel2',
        documentationLink:
            'https://developer.mastercard.com/open-banking-us/documentation/api-reference/#GetCustomerAccounts',
    },
    {
        label: 'Use cases',
        description: (
            <div className='mt-2'>
                This section provides you with an overview of the different
                solutions offered by Mastercard Open Banking. Find out about the
                APIs that power these solutions and help our partners succeed.
            </div>
        ),
        panel: 'panel3',
        documentationLink:
            'https://developer.mastercard.com/open-banking-us/documentation/usecases',
    },
];

export default Steps;
