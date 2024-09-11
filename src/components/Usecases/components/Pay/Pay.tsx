import { Grid } from '@mui/material';

import Product from '../../../Product/Product';

export default function Pay({ requestData }: any) {
    return (
        <Grid data-testid={'pay'}>
            <Product
                product={'account_ach_details'}
                requestData={requestData}
            />
            <Product product={'available_balance'} requestData={requestData} />
            <Product
                product={'account_owner_details'}
                requestData={requestData}
            />
        </Grid>
    );
}
