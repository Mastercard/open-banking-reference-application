import { generateFetchHeaders, handleFetchCall } from '../../utils/helper';

/**
 * Process product API request
 * @param product product details
 * @param requestData application parameters
 * @returns product API response
 */
export const proccessSendRequest = async (product: any, requestData: any) => {
    const requestHeaders = await generateFetchHeaders(
        product.requestType,
        requestData
    );
    switch (product.identifier.toLowerCase()) {
        case 'accounts':
            return getAccountsInformation(product, requestData, requestHeaders);
        case 'refresh_accounts':
            return refreshAccounts(product, requestData, requestHeaders);
        case 'transactions':
            return getTransactions(product, requestData, requestHeaders);
        case 'account_ach_details':
            return getAchDetails(product, requestData, requestHeaders);
        case 'available_balance':
            return getAvailableBalanceLive(
                product,
                requestData,
                requestHeaders
            );
        case 'account_owner_details':
            return getAccountOwners(product, requestData, requestHeaders);
        default:
            throw new Error('Invalid product');
    }
};

/**
 * Get accounts information
 * @param product product details
 * @param requestData application parameters
 * @param requestHeaders requestHeaders
 * @returns get account information response
 */
const getAccountsInformation = async (
    product: any,
    requestData: any,
    requestHeaders: any
): Promise<any> => {
    const response = await handleFetchCall(
        product.api,
        requestData,
        requestHeaders
    );
    const tableData = getTableData(response.accounts, product.columns);
    return { tableData, response };
};

/**
 * Refresh shared accounts
 * @param product product details
 * @param requestData application parameters
 * @param requestHeaders requestHeaders
 */
const refreshAccounts = async (
    product: any,
    requestData: any,
    requestHeaders: any
): Promise<any> => {
    return handleFetchCall(product.api, requestData, requestHeaders);
};

/**
 * Get account transactions
 * @param product product details
 * @param requestData application parameters
 * @param requestHeaders requestHeaders
 * @returns get transaction response
 */
const getTransactions = async (
    product: any,
    requestData: any,
    requestHeaders: any
): Promise<any> => {
    const tableDataArray: any = [];
    const todayDate = new Date();
    const endDate = Math.floor(todayDate.getTime() / 1000);
    todayDate.setMonth(todayDate.getMonth() - 1);
    const startDate = Math.floor(todayDate.getTime() / 1000);
    requestData.startDate = startDate;
    requestData.endDate = endDate;
    const response = await handleFetchCall(
        product.api,
        requestData,
        requestHeaders,
        requestData.currentAccount
    );
    if (response.transactions.length > 0) {
        for (const trxn of response.transactions) {
            const date = new Date(trxn.postedDate * 1000).toLocaleDateString(
                'en-us',
                { day: '2-digit', month: 'long', year: 'numeric' }
            );
            tableDataArray.push({
                date: date,
                description: trxn.description,
                amount: trxn.amount,
                currency: 'USD',
            });
        }
        requestData.accountData.map((account: any) => {
            if (account.id === requestData.currentAccount.id) {
                account['transactions'] = tableDataArray;
                account['transactionsJson'] = response;
            }
        });
    }

    return { tableData: tableDataArray, response: response };
};

/**
 * Get Account ACH details
 * @param product product details
 * @param requestData application parameters
 * @param requestHeaders requestHeaders
 * @returns Account ACH details response
 */
const getAchDetails = async (
    product: any,
    requestData: any,
    requestHeaders: any
): Promise<any> => {
    const accounts = requestData.accountData.filter((account: any) =>
        ['checking', 'savings', 'moneyMarket'].includes(account.type)
    );
    checkForAccountError(product, accounts);
    const tableDataArray = [];
    const jsonArray = [];
    const processRequest = [];
    for (const account of accounts) {
        processRequest.push(
            handleFetchCall(product.api, requestData, requestHeaders, account)
        );
    }
    const responses: any = await Promise.all(processRequest);
    for (const [index, response] of responses.entries()) {
        const paymentInstruction = {
            id: accounts[index].id,
            accountNumber: response?.realAccountNumber,
            routingNumber: response?.routingNumber,
        };
        tableDataArray.push(paymentInstruction);
        jsonArray.push(response);
    }

    checkForAccountError(product, jsonArray);
    return { tableData: tableDataArray, response: jsonArray };
};

/**
 * Get live available response
 * @param product product details
 * @param requestData application parameters
 * @param requestHeaders requestHeaders
 * @returns get available balance live response
 */
const getAvailableBalanceLive = async (
    product: any,
    requestData: any,
    requestHeaders: any
): Promise<any> => {
    const accounts = requestData.accountData.filter((account: any) =>
        ['checking', 'savings', 'moneyMarket', 'cd'].includes(account.type)
    );
    const tableDataArray = [];
    const jsonArray = [];
    const processRequest = [];
    for (const account of accounts) {
        processRequest.push(
            handleFetchCall(product.api, requestData, requestHeaders, account)
        );
    }
    const responses = await Promise.all(processRequest);
    for (const response of responses) {
        const paymentInstruction = {
            id: response.id,
            accountNumber: response.realAccountNumberLast4,
            availableBalance: response.availableBalance,
            currency: response.currency,
        };
        tableDataArray.push(paymentInstruction);
        jsonArray.push(response);
    }

    checkForAccountError(product, jsonArray);
    return { tableData: tableDataArray, response: jsonArray };
};

/**
 * Get account owners
 * @param product product details
 * @param requestData application parameters
 * @param requestHeaders requestHeaders
 * @returns account owners response
 */
const getAccountOwners = async (
    product: any,
    requestData: any,
    requestHeaders: any
): Promise<any> => {
    const accounts = requestData.accountData;
    const tableDataArray = [];
    const jsonArray = [];
    const processRequest = [];
    for (const account of accounts) {
        processRequest.push(
            handleFetchCall(product.api, requestData, requestHeaders, account)
        );
    }
    const responses: any = await Promise.all(processRequest);
    for (const [index, response] of responses.entries()) {
        const holderDetails = response?.holders[0];
        const paymentInstruction = {
            id: accounts[index].id,
            name: holderDetails.ownerName,
            address: holderDetails?.addresses[0].ownerAddress,
        };
        tableDataArray.push(paymentInstruction);
        jsonArray.push(response);
    }

    return { tableData: tableDataArray, response: jsonArray };
};

/**
 * Process data to display on table
 * @param jsonData json response
 * @param columns table columns
 * @returns table response
 */
const getTableData = (jsonData: any, columns: any) => {
    return jsonData.map((data: any) => {
        const candidate: any = {};
        columns.forEach((column: any) => {
            candidate[column.accessorKey] = data[column.accessorKey];
        });
        return candidate;
    });
};

const checkForAccountError = (product: any, jsonArray: any) => {
    if (jsonArray.length === 0) {
        const accountTypeError = new Error();
        accountTypeError.message = product.error.accountError;
        accountTypeError.cause = 'warning';
        throw accountTypeError;
    }
};
