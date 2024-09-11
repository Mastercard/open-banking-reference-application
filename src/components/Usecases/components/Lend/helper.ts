import data from './data';
import { statement } from './data/statement';

import { generateFetchHeaders } from '../../../../utils/helper';
import { Dispatch } from 'redux';
import { reportProgressActions } from '../../../../store/slices/report-progress';

/**
 * Submit report for generation
 * @param reportData report data
 * @param requestData application parameters
 * @param dispatch redux action dispatcher
 * @returns
 */
export const submitReport = async (
    reportData: any,
    requestData: any,
    dispatch: Dispatch
) => {
    const isAnalyticsReports = ['bar', 'cfar'].includes(reportData.identifier);
    dispatch(
        reportProgressActions.increaseByvalue(isAnalyticsReports ? 50 : 5)
    );
    const reportId = await generateReport(reportData, requestData);
    dispatch(
        reportProgressActions.increaseByvalue(isAnalyticsReports ? 25 : 10)
    );
    if (
        await reportGenerated(
            reportId,
            requestData,
            dispatch,
            isAnalyticsReports,
            reportData
        )
    ) {
        dispatch(reportProgressActions.absoluteValue(90));
        return getReport(reportId, requestData, isAnalyticsReports);
    }
};

/**
 * Generate report
 * @param reportData any
 * @param requestData application parameters
 * @returns generate report response
 */
const generateReport = async (reportData: any, requestData: any) => {
    let requestBody = reportData.body
    const requestHeaders = await generateFetchHeaders('POST', requestData);
    if (reportData.identifier === 'voieptx') {
        const assetId = await storeCustomerPayStatement(requestHeaders, requestData);
        const updatedBody = {
            voieWithInterviewData: {
                txVerifyInterview: [
                    {
                        assetId: assetId,
                    },
                ],
                extractEarnings: true,
                extractDeductions: true,
                extractDirectDeposit: true,
            },
            reportCustomFields: [
                {
                    label: 'loanID',
                    value: '123456',
                    shown: true,
                },
                {
                    label: 'loanID',
                    value: '123456',
                    shown: true,
                },
            ],
        };
        requestBody = JSON.stringify(updatedBody);
    }
    const requestOptions = { ...requestHeaders, body: requestBody };
    const result = await fetch(
        reportData.api.replace('<customerId>', requestData.customerId),
        requestOptions
    );
    const reportResult = await result.json();
    return reportResult?.id || reportResult?.reportId;
};

const storeCustomerPayStatement = async (
    requestHeaders: any,
    requestData: any
) => {
    const requestOptions = {
        ...requestHeaders,
        body: JSON.stringify({
            label: 'lastPayPeriod',
            statement,
        }),
    };
    const result = await fetch(
        data.url.payStatements.replace('<customerId>', requestData.customerId),
        requestOptions
    );
    const payStatementResponse = await result.json();
    return payStatementResponse.assetId
};

/**
 * Delay
 * @param ms delay time in milliseconds
 * @returns Promise with setTimeout
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Check if report generated or not
 * @param reportId submitted report id
 * @param requestData  application parameters
 * @param dispatch redux action dispatcher
 * @returns report generated or not
 */
const reportGenerated = async (
    reportId: string,
    requestData: any,
    dispatch: Dispatch,
    isAnalytics: boolean,
    reportData: any
) => {
    if (isAnalytics) return true;
    let retry = 10;
    let reportsPending = await checkReportStatus(
        reportId,
        requestData,
        dispatch
    );
    if (!reportsPending) {
        return true;
    }
    while (retry > 0) {
        retry--;
        await delay(reportData.identifier === 'voieptx' ? 20000 : 2000 );
        reportsPending = await checkReportStatus(
            reportId,
            requestData,
            dispatch
        );
        if (!reportsPending) {
            break;
        }
    }
    return retry > 0;
};

/**
 * Check report status
 * @param reportId submitted report id
 * @param requestData  application parameters
 * @param dispatch redux action dispatcher
 * @returns report generated or not
 */
const checkReportStatus = async (
    reportId: string,
    requestData: any,
    dispatch: Dispatch
) => {
    const requestHeaders = await generateFetchHeaders('GET', requestData);
    const result = await fetch(
        data.url.getReportStatus.replace(
            '<customerId>',
            String(requestData.customerId)
        ),
        { ...requestHeaders }
    );
    const reportsStatusResult = await result.json();
    const pendingReports = reportsStatusResult?.reports
        .filter((report: any) => report?.id === reportId)
        .filter((report: any) => report?.status != 'success');
    dispatch(reportProgressActions.increaseByvalue(5));
    return pendingReports.length > 0;
};

/**
 * Get report
 * @param reportId submitted report id
 * @param requestData application parameters
 * @returns get report (json and pdf)
 */
const getReport = async (
    reportId: string,
    requestData: any,
    isAnalytics: boolean
) => {
    const requestHeadersPDF = await generateFetchHeaders(
        'GET',
        requestData,
        'application/pdf'
    );
    const requestHeadersJSON = await generateFetchHeaders('GET', requestData);
    const url = isAnalytics ? data.url.getAnalyticsReport : data.url.getReport;
    const getReports = [
        fetch(
            url
                .replace('<customerId>', String(requestData.customerId))
                .replace('<reportId>', reportId),
            { ...requestHeadersPDF }
        ),
        fetch(
            url
                .replace('<customerId>', String(requestData.customerId))
                .replace('<reportId>', reportId),
            { ...requestHeadersJSON }
        ),
    ];
    const reports = await Promise.all(getReports);
    const blob = await reports[0].blob();
    const jsonReport = await reports[1].json();
    return { pdf: blob, json: jsonReport };
};

/**
 * Download report
 * @param report generated report
 * @param filename filename
 * @param isPdf is PDF or not
 */
export const downloadReport = (report: any, filename: string, isPdf = true) => {
    const fileURL = isPdf
        ? window.URL.createObjectURL(report)
        : `data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(report, null, 2)
          )}`;
    const alink = document.createElement('a');
    alink.href = fileURL;
    alink.download = `${filename}.${isPdf ? 'pdf' : 'json'}`;
    alink.click();
};

/**
 * Download PDF report
 * @param report generated report
 * @param filename filename
 */
export const downloadPDf = (report: any, filename: string) => {
    const fileURL = window.URL.createObjectURL(report);
    const alink = document.createElement('a');
    alink.target = '_blank';
    alink.href = fileURL;
    alink.download = `${filename}.json`;
    alink.click();
};

/**
 * Download json report
 * @param report generated report
 */
export const downloadJson = (report: any) => {
    const x: any = window.open();
    x.document.open();
    x.document.write(
        '<html><body><pre>' +
            JSON.stringify(report, null, 2) +
            '</pre></body></html>'
    );
};
