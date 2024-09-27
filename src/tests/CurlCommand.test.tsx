import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CurlCommand } from '../components';

import data from '../components/Product/data';
import requestData from './Mocks/request-data';
const writeText = jest.fn();

Object.assign(navigator, {
    clipboard: {
        writeText,
    },
});
describe('Testing curl command Component', () => {
    test('Should open snack bar when severity error', () => {
        render(
            (
                <CurlCommand
                    product={data.products[0]}
                    requestData={requestData}
                />
            ) as React.ReactElement
        );
        expect(screen.getByText(/curl --location/i)).toBeInTheDocument();
    });

    test('Should copy To Clip Board', async () => {
        render(
            (
                <CurlCommand
                    product={data.products[0]}
                    requestData={{ ...requestData, token: null }}
                    body={JSON.stringify({ foo: ' bar' })}
                />
            ) as React.ReactElement
        );
        navigator.clipboard.writeText = jest.fn().mockReturnValueOnce('copied');
        await userEvent.click(screen.getByTestId('copyToClipBoard'));
        await screen.findByText('copied!');
        await screen.findByText('copy to clipboard', {}, { timeout: 2000 });
    });
});
