import accountData from './accounts-data';
const requestData: any = {
    customerId: '1234567890',
    institutionLoginId: '1234567',
    token: 'qwertyui',
    consentReceiptId: 'asdfghjkl',
    accountData,
    currentAccount: accountData[0],
    accountDisplayNames: accountData.map((account: any) => account.name),
};

export default requestData;
