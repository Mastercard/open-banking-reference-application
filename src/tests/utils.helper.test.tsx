import { generateFetchHeaders, generateAppToken } from '../utils/helper';

import requestData from './Mocks/request-data';

describe('Testing Utils', () => {
    describe('Testing generateFetchHeaders', () => {
        test('Should test generateFetchHeaders', async () => {
            localStorage.setItem(
                'tokenGeneratedAt',
                String(new Date().getTime())
            );
            const result = await generateFetchHeaders('GET', requestData);
            expect(result.method).toEqual('GET');
        });

        test('Should test generateFetchHeaders when requestData not provide', async () => {
            const result = await generateFetchHeaders('GET');
            expect(result.method).toEqual('GET');
        });
    });

    describe('Testing generateAppToken', () => {
        test('should test generateAppToken', async () => {
            window.fetch = jest.fn().mockResolvedValue({
                json: async () => {
                    return {
                        token: 'asdfghjkl',
                    };
                },

                status: 200,
            });
            const token = await generateAppToken({
                partnerId: '1234567890',
                partnerSecret: 'qwertyuiop',
            });
            expect(token).toEqual('asdfghjkl');
        });

        test('should test generateAppToken', async () => {
            try {
                window.fetch = jest.fn().mockResolvedValue({
                    text: async () => 'unauthorized',

                    status: 401,
                });
                await generateAppToken({
                    partnerId: '1234567890',
                    partnerSecret: 'qwertyuiop',
                });
            } catch (error: any) {
                expect(error.message).toEqual('unauthorized');
            }
        });

        test('should test generateAppToken', async () => {
            try {
                window.fetch = jest.fn().mockResolvedValue({
                    text: async () => 'restricted region',

                    status: 403,
                });
                await generateAppToken({
                    partnerId: '1234567890',
                    partnerSecret: 'qwertyuiop',
                });
            } catch (error: any) {
                expect(error.message).toEqual(
                    'Applications accessing the Open Banking APIs must be hosted within the US.'
                );
            }
        });

        test('should test generateAppToken', async () => {
            try {
                window.fetch = jest.fn().mockResolvedValue({
                    json: async () => {
                        return {
                            message: 'resource not found',
                        };
                    },
                    status: 404,
                });
                await generateAppToken({
                    partnerId: '1234567890',
                    partnerSecret: 'qwertyuiop',
                });
            } catch (error: any) {
                expect(error.message).toEqual('resource not found');
            }
        });
    });
});
