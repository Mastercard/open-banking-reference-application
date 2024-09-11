import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Alert,
} from '@mui/material';

import { PARTNERID, PARTNERSECRET, APP_KEY } from '../../config';

import data from './data';

export default function AlertBox() {
    const [openAlert] = useState(!(PARTNERID && PARTNERSECRET && APP_KEY));

    return (
        <Dialog
            data-testid='alert-box'
            open={openAlert}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle
                id='alert-dialog-title'
                data-testid='alert-box-title'
                sx={{
                    color: '#EB001B',
                }}
            >
                {data.text.invalidConfiguration}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    <Alert
                        data-testid='alert-message'
                        severity='error'
                        sx={{
                            color: '#EB001B',
                        }}
                    >
                        <div>{data.text.invalidKeys}</div>
                    </Alert>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
