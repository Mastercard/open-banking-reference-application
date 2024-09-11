import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CurlCommand } from '../components';
const writeText = jest.fn();

Object.assign(navigator, {
    clipboard: {
        writeText,
    },
});
describe('Testing curl command Component', () => {
    const product = {
        name: 'Accounts',
        identifier: 'accounts',
        type: 'pay',
        requestType: 'GET',
        description: ' Get a list of shared accounts and their properties.',
        api: '/aggregation/v1/customers/<customerId>/institutionLogins/<institutionLoginId>/accounts',
        link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/?view=api#GetCustomerAccounts',
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
    const requestData = {
        customerId: '2493226',
        institutionLoginId: 2340097,
        token: 'L5jdSj5YtX6P0h8Wqa9W',
        consentReceiptId: 'fd97cba7-1545-4aae-9fbe-e105c813e092',
        accountData: [
            {
                id: '15430029',
                number: '8000008888',
                accountNumberDisplay: '8888',
                name: 'Auto Loan',
                balance: -801.15,
                type: 'loan',
                aggregationStatusCode: 0,
                status: 'active',
                customerId: '2493226',
                institutionId: '200000',
                balanceDate: 1722503718,
                aggregationSuccessDate: 1722503720,
                aggregationAttemptDate: 1722503720,
                createdDate: 1722503705,
                lastUpdatedDate: 1722539713,
                currency: 'AUD',
                lastTransactionDate: 1722503718,
                institutionLoginId: 2340097,
                displayPosition: 1,
                financialinstitutionAccountStatus: 'OPEN',
                accountNickname: 'Auto Loan',
                marketSegment: 'personal',
                displayName: 'Auto Loan 8888',
            },
            {
                id: '15430030',
                number: '2000005555',
                accountNumberDisplay: '5555',
                name: 'Home Mortgage',
                balance: -801.15,
                type: 'mortgage',
                aggregationStatusCode: 0,
                status: 'active',
                customerId: '2493226',
                institutionId: '200000',
                balanceDate: 1722503718,
                aggregationSuccessDate: 1722503720,
                aggregationAttemptDate: 1722503720,
                createdDate: 1722503705,
                lastUpdatedDate: 1722539713,
                currency: 'AUD',
                lastTransactionDate: 1722503718,
                institutionLoginId: 2340097,
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
                    loanMinAmtDueDate: 1724587200,
                },
                displayPosition: 4,
                financialinstitutionAccountStatus: 'OPEN',
                accountNickname: 'Home Mortgage',
                marketSegment: 'personal',
                displayName: 'Home Mortgage 5555',
            },
            {
                id: '15430031',
                number: '2000004444',
                accountNumberDisplay: '4444',
                name: 'Roth IRA',
                balance: 801.15,
                type: 'investment',
                aggregationStatusCode: 0,
                status: 'active',
                customerId: '2493226',
                institutionId: '200000',
                balanceDate: 1722503718,
                aggregationSuccessDate: 1722503720,
                aggregationAttemptDate: 1722503720,
                createdDate: 1722503705,
                lastUpdatedDate: 1722539713,
                currency: 'AUD',
                lastTransactionDate: 1722503718,
                institutionLoginId: 2340097,
                detail: {
                    marginAllowed: true,
                    cashAccountAllowed: true,
                    vestedBalance: 1250,
                    currentLoanBalance: 4500,
                    loanRate: 3,
                },
                displayPosition: 2,
                financialinstitutionAccountStatus: 'OPEN',
                accountNickname: 'Roth IRA',
                marketSegment: 'personal',
                displayName: 'Roth IRA 4444',
            },
            {
                id: '15430035',
                number: '1000001111',
                realAccountNumberLast4: '1111',
                accountNumberDisplay: '1111',
                name: 'Transaction And Savings',
                balance: 801.15,
                type: 'transactionAndSavings',
                aggregationStatusCode: 0,
                status: 'active',
                customerId: '2493226',
                institutionId: '200000',
                balanceDate: 1722503718,
                aggregationSuccessDate: 1722503720,
                aggregationAttemptDate: 1722503720,
                createdDate: 1722503705,
                lastUpdatedDate: 1722539713,
                currency: 'AUD',
                lastTransactionDate: 1722503718,
                institutionLoginId: 2340097,
                detail: {
                    availableBalanceAmount: 801.15,
                    periodInterestRate: '4.5',
                    openDate: 1639180800,
                },
                displayPosition: 3,
                financialinstitutionAccountStatus: 'OPEN',
                accountNickname: 'Transaction And Savings',
                marketSegment: 'personal',
                displayName: 'Transaction And Savings 1111',
            },
        ],
        currentAccount: {
            id: '15430029',
            number: '8000008888',
            accountNumberDisplay: '8888',
            name: 'Auto Loan',
            balance: -801.15,
            type: 'loan',
            aggregationStatusCode: 0,
            status: 'active',
            customerId: '2493226',
            institutionId: '200000',
            balanceDate: 1722503718,
            aggregationSuccessDate: 1722503720,
            aggregationAttemptDate: 1722503720,
            createdDate: 1722503705,
            lastUpdatedDate: 1722539713,
            currency: 'AUD',
            lastTransactionDate: 1722503718,
            institutionLoginId: 2340097,
            displayPosition: 1,
            financialinstitutionAccountStatus: 'OPEN',
            accountNickname: 'Auto Loan',
            marketSegment: 'personal',
            displayName: 'Auto Loan 8888',
        },
        accountDisplayNames: [
            'Auto Loan 8888',
            'Home Mortgage 5555',
            'Roth IRA 4444',
            'Transaction And Savings 1111',
        ],
    };
    const body = undefined;
    test('Should open snack bar when severity error', () => {
        render(
            (
                <CurlCommand
                    product={product}
                    requestData={requestData}
                    body={body}
                />
            ) as React.ReactElement
        );
        expect(screen.getByText(/curl --location/i)).toBeInTheDocument();
    });

    test('Should copy To Clip Board', async () => {
        render(
            (
                <CurlCommand
                    product={product}
                    requestData={requestData}
                    body={body}
                />
            ) as React.ReactElement
        );
        navigator.clipboard.writeText = jest.fn().mockReturnValueOnce('copied');
        await userEvent.click(screen.getByTestId('copyToClipBoard'));
        await screen.findByText('copied!');
        await screen.findByText('copy to clipboard', {}, { timeout: 2000 });
    });
});
