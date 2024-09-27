import { Grid, Stack, Typography, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import InputField from '../../FormFields/InputField';

import './UserNameForm.css';

export default function UserNameForm(props: any) {
    const {
        formField: { userName },
    } = props;
    return (
        <Grid container spacing={3} className='mb-5'>
            <Grid item xs={12} md={3}>
                <Stack direction='column'>
                    <Typography fontWeight='bold' fontSize={16} variant='h6'>
                        Username
                    </Typography>
                    <Typography fontSize={16} variant='body1'>
                        Enter a unique identifier for the customer
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12} md={9}>
                <InputField name={userName.name} fullWidth />
                <Tooltip title={userName.suggestionMessage}>
                    <InfoOutlinedIcon
                        className={'info-icon'}
                        fontSize='small'
                    />
                </Tooltip>
            </Grid>
        </Grid>
    );
}
