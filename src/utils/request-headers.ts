import { APP_KEY, REQUEST_BODY, REGION, REGIONS } from '../config/config';

export const generateFetchHeaders = (method: string, token = '') => {
    if (!REGIONS.includes(REGION)) {
        throw new Error(
            'Invalid Region: This application is supported for United States (US) and Australia (AU) region only.'
        );
    }
    const myHeaders = new Headers();
    myHeaders.append('Finicity-App-Key', APP_KEY);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    if (token) {
        myHeaders.append('Finicity-App-Token', token);
    }
    return {
        method: method,
        headers: myHeaders,
        mode: 'cors' as RequestMode,
    };
};

export const getFetchBody = (step: any) => {
    return REQUEST_BODY[step as keyof typeof REQUEST_BODY];
};
