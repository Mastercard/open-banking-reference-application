import { render, screen } from '@testing-library/react';
import { DataTable } from '../components';

describe('Testing data table Component', () => {
    const columns = [
        {
            accessorKey: 'id',
            header: 'Account Id',
        },
        {
            accessorKey: 'accountNumber',
            header: 'Account Number',
        },
        {
            accessorKey: 'availableBalance',
            header: 'Available Balance',
        },
        {
            accessorKey: 'currency',
            header: 'Currency',
        },
    ];
    const data = [
        {
            id: '15430035',
            accountNumber: '1111',
            availableBalance: 801.39,
            currency: 'AUD',
        },
        {
            id: '15430036',
            accountNumber: '1112',
            availableBalance: 801.39,
            currency: 'AUD',
        },
    ];
    test('Should create data table', () => {
        const product = 'Transactions';
        render(
            (
                <DataTable columns={columns} data={data} product={product} />
            ) as React.ReactElement
        );
        expect(screen.getByTestId('table')).toBeInTheDocument();
    });

    test('Should create data table with available balance - live', () => {
        const product = 'Available balance - Live';
        render(
            (
                <DataTable columns={columns} data={data} product={product} />
            ) as React.ReactElement
        );
        expect(screen.getByTestId('table')).toBeInTheDocument();
    });
});
