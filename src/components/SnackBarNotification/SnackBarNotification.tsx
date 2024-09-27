import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { snackbarActions } from '../../store/slices/snackbar';

export default function SnackBarNotificaton() {
    const dispatch = useDispatch();
    const snackbarContent = useSelector((state: any) => state.snackbarState);
    let backgroundColor = '#FF5555';
    if (
        snackbarContent.severity === 'success' ||
        snackbarContent.severity === 'info'
    ) {
        backgroundColor = '#2d7763';
    } else if (snackbarContent.severity === 'warning') {
        backgroundColor = '#F79E1B';
    }

    let position: any = {
        vertical: 'bottom',
        horizontal: 'center',
    };

    if (
        snackbarContent.severity === 'success' ||
        snackbarContent.severity === 'info'
    ) {
        position = {
            vertical: 'bottom',
            horizontal: 'left',
        };
    }

    /**
     * Sackbar close event handler
     * @param event SyntheticEvent
     * @param reason reason on click
     * @returns
     */
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarActions.close());
    };
    return (
        <Snackbar
            data-testid={'snackbar'}
            open={snackbarContent.open}
            onClose={handleClose}
            anchorOrigin={position}
            autoHideDuration={snackbarContent.timeout || 5000}
        >
            <Alert
                data-testid={'snackbar-message'}
                onClose={handleClose}
                severity={snackbarContent.severity}
                variant='filled'
                sx={{
                    width: '100%',
                    backgroundColor,
                    color: '#FFFFFF',
                }}
            >
                {snackbarContent.message}
            </Alert>
        </Snackbar>
    );
}
