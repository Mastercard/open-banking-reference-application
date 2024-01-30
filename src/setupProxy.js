/* eslint-disable @typescript-eslint/no-var-requires, no-undef  */
/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware');
const regions = require('./utils/region-config');

module.exports = function (app) {
    app.use(
        regions.paths,
        createProxyMiddleware({
            target: regions.domains[regions.region] ?? regions.domains.us,
            changeOrigin: true,
            pathRewrite: regions.rewritePaths
        })
    );
};
