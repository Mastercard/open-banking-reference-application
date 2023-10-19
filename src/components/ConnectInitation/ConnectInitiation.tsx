import { Grid, Stack, Typography } from '@mui/material';
import SandBoxTip from '../SandBoxTip/SandBoxTip';
export default function ConnectInitiation({
    user: { username, createdDate },
}: any) {
    return (
        <>
            <Grid
                justifyContent='space-between'
                container
                columnSpacing={{ xs: 2, sm: 3, md: 4 }}
            >
                <Grid item xs={6} className='mt-2'>
                    <Stack direction='column' spacing={2}>
                        <Typography variant='body2' className='!font-[700]'>
                            Customer Name
                        </Typography>
                        <Typography
                            variant='body2'
                            className='break-words !mt-1'
                            data-testid='customer-name'
                        >
                            {username}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={6} className='mt-2'>
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
        </>
    );
}
