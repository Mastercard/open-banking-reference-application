import { APP_KEY, url, PARTNERID, PARTNERSECRET } from '../config';

/**
 * Get request headers for fetch call
 * @param method method type
 * @param requestData application parameters
 * @param accept accept type
 * @returns request headers
 */
export const generateFetchHeaders = async (
    method: string,
    requestData: any = {},
    accept = 'application/json'
) => {
    const myHeaders = new Headers();
    myHeaders.append('Finicity-App-Key', APP_KEY);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', accept);
    if (requestData?.token) {
        if (
            localStorage.getItem('tokenGeneratedAt') &&
            new Date().getHours() -
                new Date(
                    Number(localStorage.getItem('tokenGeneratedAt'))
                ).getHours() >
                0
        ) {
            requestData.token = await generateAppToken({
                partnerId: PARTNERID,
                partnerSecret: PARTNERSECRET,
            });
        }
        myHeaders.append('Finicity-App-Token', requestData.token);
    }

    if (requestData?.consentReceiptId) {
        myHeaders.append('Consent-Receipt-Id', requestData.consentReceiptId);
    }

    return {
        method: method,
        headers: myHeaders,
        mode: 'cors' as RequestMode,
    };
};

/**
 * Generate app token
 * @param requestData application parameters
 * @returns token (string)
 */
export const generateAppToken = async (requestData: any) => {
    const requestHeaders = await generateFetchHeaders('POST', requestData);
    const body = JSON.stringify({
        partnerId: requestData.partnerId,
        partnerSecret: requestData?.partnerSecret,
    });
    const requestOptions = {
        ...requestHeaders,
        body,
    };
    const { token } = await handleFetchResponse(
        await fetch(url.generateAppToken, requestOptions)
    );
    localStorage.setItem('tokenGeneratedAt', String(new Date().getTime()));
    return token;
};

/**
 * Handle fetch call
 * @param url fetch call URL
 * @param requestData application parameters
 * @param requestHeaders request headers
 * @param account account
 * @returns fetch response
 */
export const handleFetchCall = async (
    url: any,
    requestData: any,
    requestHeaders: any,
    account?: any
) => {
    const { institutionLoginId, customerId, startDate, endDate } = requestData;
    const api = url
        .replace('<institutionLoginId>', institutionLoginId)
        .replace('<customerId>', customerId)
        .replace('<accountId>', account?.id)
        .replace('<startDate>', startDate)
        .replace('<endDate>', endDate);
    return handleFetchResponse(await fetch(api, { ...requestHeaders }));
};

/**
 * Fetch response handler
 * @param response fetch response
 * @returns processed fetch response
 */
export const handleFetchResponse = async (response: any) => {
    if (response.status !== 200 && response.status !== 201) {
        if (response.status === 401) {
            const responseText = await response.text();
            throw new Error(responseText);
        } else if (response.status === 403) {
            throw new Error(
                'Applications accessing the Open Banking APIs must be hosted within the US.'
            );
        } else {
            const { message } = await response.json();
            throw new Error(message);
        }
    }
    return response.json();
};
