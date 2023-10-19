import { render, screen } from '@testing-library/react';
import AccountInfo from '../components/AccountInfo/AccountInfo';
const accountData = [
    {
        id: '1234567890',
        number: 'xxxxxx1234',
        accountNumberDisplay: '1234',
        name: 'Auto Loan',
        balance: -923.33,
        type: 'loan',
        aggregationStatusCode: 0,
        status: 'active',
        customerId: '309876543221',
        institutionId: '123456',
        balanceDate: 1695490414,
        aggregationSuccessDate: 1695490414,
        aggregationAttemptDate: 1695490414,
        createdDate: 1695490405,
        lastUpdatedDate: 1695490409,
        currency: 'USD',
        lastTransactionDate: 1695490414,
        institutionLoginId: 3008047326,
        detail: {
            payoffAmount: 101.11,
            principalBalance: 1021.21,
            escrowBalance: 71.45,
            interestRate: '1.65',
            autoPayEnrolled: 'Y',
            collateral: 'test collateral',
            currentSchool: 'current school',
            firstMortgage: 'N',
            loanPaymentFreq: 'loan pay freq',
            paymentMinAmount: 232,
            originalSchool: 'original school',
            recurringPaymentAmount: 232,
            lender: 'lender',
            availableBalanceAmount: 78.11,
            endingBalanceAmount: 66.33,
            loanTermType: 'loan term type',
            paymentsMade: 4,
            balloonAmount: 88.11,
            projectedInterest: 54.22,
            interestPaidLtd: 12.22,
            interestRateType: 'interest rate type',
            loanPaymentType: 'loan payment type',
            paymentsRemaining: 88,
            loanMinAmtDue: 250,
            loanMinAmtDueDate: 1758801600,
        },
        displayPosition: 1,
        financialinstitutionAccountStatus: 'OPEN',
        accountNickname: 'Auto Loan',
        oldestTransactionDate: 1678190400,
        marketSegment: 'personal',
    },
    {
        id: '1234567891',
        number: 'xxxxxx6789',
        realAccountNumberLast4: '6789',
        accountNumberDisplay: '6789',
        name: 'Checking',
        balance: 923.33,
        type: 'checking',
        aggregationStatusCode: 0,
        status: 'active',
        customerId: '309876543221',
        institutionId: '123456',
        balanceDate: 1695490414,
        aggregationSuccessDate: 1695490414,
        aggregationAttemptDate: 1695490414,
        createdDate: 1695490405,
        lastUpdatedDate: 1695490409,
        currency: 'USD',
        lastTransactionDate: 1695490414,
        institutionLoginId: 3008047326,
        detail: {
            availableBalanceAmount: 923.33,
            periodInterestRate: '4.5',
            openDate: 1639206000,
        },
        displayPosition: 2,
        financialinstitutionAccountStatus: 'OPEN',
        accountNickname: 'Checking',
        oldestTransactionDate: 1678190400,
        marketSegment: 'personal',
        achData: {
            routingNumber: '123123123',
            realAccountNumber: '1000006789',
            accountId: '1234567891',
        },
    },
];

describe('Testing AccountInfo Component', () => {
    test('should render AccountInfo', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(`${accountData.length} accounts.`, {
                exact: false,
            })
        ).toBeInTheDocument();
    });

    test('Should render Available Balance section', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/available balance/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should render account information : Id', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(screen.getByText(/id/i, { exact: false })).toBeInTheDocument();
    });

    test('Should render account information : Id value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const accountIdElement = screen.getByTestId('account-id');
        expect(
            accountIdElement.textContent?.replace(/\\/g, '').replace(/"/g, '')
        ).toEqual(`${accountData[0].id}`);
    });

    test('Should Render account information : realAccountNumberLast4', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/realAccountNumberLast4/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render account information :realAccountNumberLast4 value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const realAccountNumberLast4Element = screen.getByTestId(
            'real-account-number-last-4'
        );
        expect(
            realAccountNumberLast4Element.textContent
                ?.replace(/\\/g, '')
                .replace(/"/g, '')
        ).toEqual(`${accountData[0].realAccountNumberLast4 ?? ''}`);
    });

    test('Should Render account information : availableBalance', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/availableBalance :/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render account information :availableBalance value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const availableBalanceElement = screen.getByTestId('available-balance');
        expect(
            availableBalanceElement.textContent
                ?.replace(/\\/g, '')
                .replace(/"/g, '')
        ).toEqual(`${accountData[0].detail.availableBalanceAmount}`);
    });

    test('Should Render account information : availableBalanceDate', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/availableBalanceDate/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render account information :availableBalanceDate value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const availableBalanceDateElement = screen.getByTestId(
            'available-balance-date'
        );
        expect(
            availableBalanceDateElement.textContent
                ?.replace(/\\/g, '')
                .replace(/"/g, '')
        ).toEqual(
            `${new Date(accountData[0].balanceDate * 1000).toDateString()}`
        );
    });

    test('Should Render account information : clearedBalance', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/clearedBalance :/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render account information :clearedBalance value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const clearedBalanceElement = screen.getByTestId('cleared-balance');
        expect(
            clearedBalanceElement.textContent
                ?.replace(/\\/g, '')
                .replace(/"/g, '')
        ).toEqual(`${accountData[0].balance}`);
    });

    test('Should Render account information : clearedBalancedate', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/clearedBalancedate/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render account information :clearedBalancedate value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const clearedBalancedateElement = screen.getByTestId(
            'cleared-balance-date'
        );
        expect(
            clearedBalancedateElement.textContent
                ?.replace(/\\/g, '')
                .replace(/"/g, '')
        ).toEqual(
            `${new Date(accountData[0].balanceDate * 1000).toDateString()}`
        );
    });

    test('Should Render account information : currency', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/currency/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render account information :currency value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const currencyElement = screen.getByTestId('currency');
        expect(
            currencyElement.textContent?.replace(/\\/g, '').replace(/"/g, '')
        ).toEqual(`${accountData[0].currency}`);
    });

    test('Should not render ACH detail section for non deposit account types', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(accountData[0].type).not.toEqual('savings');
        expect(accountData[0].type).not.toEqual('checking');
        expect(
            screen.queryByText(/ach detail/i, { exact: false })
        ).not.toBeInTheDocument();
    });

    test('Should Render ACH detail for deposit account types', () => {
        render(
            (
                <AccountInfo accountData={[accountData[1]]} />
            ) as React.ReactElement
        );
        expect(accountData[1].type).toEqual('checking');
        expect(accountData[1].type).not.toEqual('loan');
        expect(
            screen.getByText(/ach detail/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render routing number in ACH detail for deposit account types', () => {
        render(
            (
                <AccountInfo accountData={[accountData[1]]} />
            ) as React.ReactElement
        );
        expect(
            screen.getByText(/routingNumber :/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render routing number valuein ACH detail for deposit account types', () => {
        render(
            (
                <AccountInfo accountData={[accountData[1]]} />
            ) as React.ReactElement
        );
        const routingNumber = screen.getByTestId('routing-number');
        expect(
            routingNumber.textContent?.replace(/\\/g, '').replace(/"/g, '')
        ).toEqual(`${accountData[1].achData?.routingNumber}`);
    });

    test('Should Render real account number in ACH detail for deposit account types', () => {
        render(
            (
                <AccountInfo accountData={[accountData[1]]} />
            ) as React.ReactElement
        );
        expect(
            screen.getByText(/realAccountNumber :/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render real account value in ACH detail for deposit account types', () => {
        render(
            (
                <AccountInfo accountData={[accountData[1]]} />
            ) as React.ReactElement
        );
        const realAccountNumber = screen.getByTestId('real-account-number');
        expect(
            realAccountNumber.textContent?.replace(/\\/g, '').replace(/"/g, '')
        ).toEqual(`${accountData[1].achData?.realAccountNumber}`);
    });
});
