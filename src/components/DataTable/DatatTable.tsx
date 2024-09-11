import {
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import {
    MRT_TableBodyCellValue,
    MRT_TablePagination,
    useMaterialReactTable,
} from 'material-react-table';

export default function DataTable({ columns, data, product }: any) {
    const table = useMaterialReactTable({
        columns,
        data,
        initialState: {
            pagination: {
                pageSize: product === 'Transactions' ? 5 : 100,
                pageIndex: 0,
            },
        },
        muiPaginationProps: {
            rowsPerPageOptions: [5, 10],
            variant: 'outlined',
        },
    });
    return (
        <Stack direction='column' spacing={1}>
            <Grid item xs={12} className='!mt-10'>
                <TableContainer data-testid={'table'}>
                    <Table>
                        <TableHead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableCell
                                            sx={{
                                                fontWeight: 'bold',
                                                borderBottom: '1px solid black',
                                            }}
                                            align='left'
                                            variant='head'
                                            key={header.id}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : header.column.columnDef
                                                      .header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {table.getRowModel().rows.map((row, rowIndex) => (
                                <TableRow
                                    key={row.id}
                                    selected={row.getIsSelected()}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            align='left'
                                            variant='body'
                                            key={cell.id}
                                        >
                                            {/* Use MRT's cell renderer that provides better logic than flexRender */}
                                            {cell ? (
                                                <MRT_TableBodyCellValue
                                                    cell={cell}
                                                    table={table}
                                                    staticRowIndex={rowIndex} //just for batch row selection to work
                                                />
                                            ) : null}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {product === 'Transactions' && (
                    <MRT_TablePagination table={table} />
                )}
            </Grid>
        </Stack>
    );
}
