import { render, screen } from '@testing-library/react';
import { JsonViewer } from '../components';

describe('Testing Json Viewer Component', () => {
    test('Should render API product card', () => {
        const jsonData = [
            {
                id: 15430035,
                realAccountNumberLast4: '1111',
                availableBalance: 801.39,
                availableBalanceDate: 1722505195,
                clearedBalance: 801.39,
                clearedBalanceDate: 1722505195,
                aggregationStatusCode: 0,
                currency: 'AUD',
            },
        ];
        render((<JsonViewer jsonData={jsonData} />) as React.ReactElement);
        expect(
            screen.getByText(/realAccountNumberLast4/i, { exact: false })
        ).toBeInTheDocument();
    });
});
