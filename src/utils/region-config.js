/* eslint-disable no-undef, @typescript-eslint/no-var-requires */

module.exports = {
    paths: ['/us', '/au'],
    domains: {
        us: 'https://api.finicity.com',
        au: 'https://api.openbanking.mastercard.com.au/'
    },
    rewritePaths: {
        '^/au': '',
        '^/us': ''
    },
    region: process.env.REACT_APP_REGION ? process.env.REACT_APP_REGION.toLowerCase() : 'us'

}