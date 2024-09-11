import { Fragment } from 'react';
import { Grid, Stack, Typography } from '@mui/material';

import { SandBoxTip } from '../../components';

export default function ConnectInitiation({
    user: { username, createdDate, id },
}: any) {
    return (
        <Fragment>
            <Grid justifyContent='space-between' container spacing={6}>
                <Grid item xs={3} className='mt-2'>
                    <Stack direction='column' spacing={2}>
                        <Typography variant='body2' className='!font-[700]'>
                            Customer Name
                        </Typography>
                        <Typography
                            variant='body2'
                            className='break-words !mt-1'
                            data-testid='customer-name'
                        >
                            John Smith
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3} className='mt-2'>
                    <Stack direction='column' spacing={2}>
                        <Typography variant='body2' className='!font-[700]'>
                            Username
                        </Typography>
                        <Typography
                            variant='body2'
                            className='!mt-1'
                            data-testid='customer-created-date'
                        >
                            <span style={{ wordWrap: 'break-word' }}>
                                {username}
                            </span>
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3} className='mt-2'>
                    <Stack direction='column' spacing={2}>
                        <Typography variant='body2' className='!font-[700]'>
                            Customer ID
                        </Typography>
                        <Typography
                            variant='body2'
                            className='!mt-1'
                            data-testid='customer-created-date'
                        >
                            {id}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3} className='mt-2'>
                    <Stack direction='column' spacing={2}>
                        <Typography variant='body2' className='!font-[700]'>
                            Date created:
                        </Typography>
                        <Typography
                            variant='body2'
                            className='!mt-1'
                            data-testid='customer-created-date'
                        >
                            {new Date(createdDate * 1000).toDateString()}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
            <SandBoxTip />
        </Fragment>
    );
}
