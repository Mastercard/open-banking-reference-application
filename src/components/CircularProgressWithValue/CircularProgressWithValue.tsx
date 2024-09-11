import {
    CircularProgress,
    CircularProgressProps,
    Typography,
    Box,
} from '@mui/material';

export default function CircularProgressWithValue(
    props: CircularProgressProps & { value: number }
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress size='2rem' variant='determinate' {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 15,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    variant='caption'
                    component='div'
                    color='inherit'
                    fontSize={10}
                    data-testid='progressBar'
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
