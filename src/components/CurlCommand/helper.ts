import { APP_KEY } from '../../config';

/**
 * Get curl command for given product API
 * @param product product details
 * @param requestData application parameters
 * @param body request body
 * @returns curl command parameters
 */
export const getCurlCommandParameters = (
    product: any,
    requestData: any,
    body: any
) => {
    const todayDate = new Date();
    const endDate = Math.floor(todayDate.getTime() / 1000);
    todayDate.setMonth(todayDate.getMonth() - 1);
    const startDate = Math.floor(todayDate.getTime() / 1000);
    const url =
        'https://api.finicity.com' +
        product.api
            .replace('<customerId>', requestData.customerId)
            .replace('<institutionLoginId>', requestData.institutionLoginId)
            .replace('<accountId>', requestData.currentAccount.id)
            .replace('<startDate>', startDate)
            .replace('<endDate>', endDate);

    const headers = [];
    let printHeaders = '';
    headers.push({ key: 'Content-Type', value: 'application/json' });
    printHeaders += '--header ' + '"Content-Type: application/json"' + ' ';
    headers.push({ key: 'Accept', value: 'application/json' });
    printHeaders += '--header ' + '"Accept: application/json"' + ' ';
    headers.push({ key: 'App-Key', value: APP_KEY });
    printHeaders += '--header ' + `"App-Key: ${APP_KEY}"` + ' ';
    if (requestData.token) {
        headers.push({ key: 'App-Token', value: requestData.token });
        printHeaders += '--header ' + `"App-Token: ${requestData.token}"` + ' ';
    }
    if (requestData.consentReceiptId) {
        headers.push({
            key: 'Consent-Receipt-Id',
            value: requestData.consentReceiptId,
        });
        printHeaders +=
            '--header ' +
            `"Consent-Receipt-Id: ${requestData.consentReceiptId}"` +
            ' ';
    }
    return {
        url,
        headers,
        dataRaw: JSON.parse(body || '{}'),
        command: `curl --location --request ${
            body ? 'POST' : 'GET'
        } "${url}" ${printHeaders}--data-raw ${JSON.stringify(body)}`,
    };
};
