import { Grid, Divider, Stack, Typography } from '@mui/material';

import { Product } from '../../components';

import data from './data';

export default function Accounts({ requestData }: any) {
    return (
        <Grid>
            <Stack direction='column' spacing={1}>
                <Typography variant='subtitle1' data-testid='accounts-test'>
                    {data.text.accountList + ' '}
                    <span className='text-gray-700'>
                        {requestData.accountData.length} accounts
                    </span>{' '}
                    {data.text.aboutAccountInfo}
                </Typography>
            </Stack>
            <Grid item xs={12} className='!mt-10'>
                <Divider />
            </Grid>
            <Product product={'accounts'} requestData={requestData} />
            <Grid item xs={12} className='!mt-10'></Grid>
        </Grid>
    );
}
