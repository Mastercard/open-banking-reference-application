import { Grid } from '@mui/material';
import Product from '../../../Product/Product';

export default function Manage({ requestData }: any) {
    return (
        <Grid data-testid={'manage'}>
            <Product product={'refresh_accounts'} requestData={requestData} />
            <Product product={'transactions'} requestData={requestData} />
        </Grid>
    );
}
