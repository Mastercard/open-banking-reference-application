/* Configure App key, Partner ID and Partner Secret */
export const PARTNERID = process.env.REACT_APP_PARTNERID ?? '';
export const PARTNERSECRET = process.env.REACT_APP_SECRET ?? '';
export const APP_KEY = process.env.REACT_APP_KEY ?? '';
export const AUTO_CREATE_CUSTOMER =
    (process.env.REACT_APP_AUTO_CREATE_CUSTOMER ?? '') === 'true';

/* URL's  */
export const url = {
    generateAppToken: '/aggregation/v2/partners/authentication',
};
