import { APP_KEY, REQUEST_BODY } from '../config/config';

export const generateFetchHeaders = (method: string, token = '') => {
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
