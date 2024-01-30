import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Alert,
    Box,
    Link,
    Stack,
    Typography,
} from '@mui/material';
import ExternalIcon from '../../utils/external-icon';
import { REGION, REGIONS } from '../../config/config';

export default function Modal() {
    const [open, setOpen] = useState(REGIONS.includes(REGION));
    const [openAlert] = useState(!REGIONS.includes(REGION));

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
        <Dialog
                open={openAlert}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle
                    id='alert-dialog-title'
                    sx={{
                        color: '#EB001B',
                    }}
                >
                    Invalid Configuration
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        <Alert
                            severity='error'
                            sx={{
                                color: '#EB001B',
                            }}
                        >
                            Looks like you have configured incorrect region. At
                            present, the application supports United States (US)
                            and Australia (AU) region only.
                        </Alert>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog
            open={open}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <Box className='modal-dialog-parent'>
                <Box className='modal-dialog-content'>
                        <Typography
                            variant='h6'
                            className='flex !font-semibold'
                        >
                        <img
                            src='/mc_symbol.svg'
                            alt='Open Banking'
                            className='w-[44px]'
                        />{' '}
                        developers
                    </Typography>
                    <Box>
                        <Typography className='ref-text'>
                            REFERENCE APP
                        </Typography>
                        <Typography className='open-bannking-text'>
                            Open Banking
                        </Typography>
                        <Typography className=''>
                            Easily connect your customer's financial data to
                            your product.
                        </Typography>
                        <Stack
                            direction='row'
                            spacing={1}
                            alignItems='flex-start'
                            sx={{ mt: 1.5 }}
                        >
                            <Link
                                variant='caption'
                                href='https://developer.mastercard.com/open-banking-us/documentation'
                                target='_blank'
                                className='!no-underline'
                                fontWeight={'bold'}
                                color={'#111'}
                            >
                                Learn more about the product
                            </Link>
                            <img
                                src='/utility.svg'
                                style={{ marginTop: '1px' }}
                                alt=''
                            />
                        </Stack>
                    </Box>

                    <Stack direction='row' className='gap-2'>
                        <Button
                            variant='text'
                            onClick={handleClose}
                            className='demo__button flex items-center'
                        >
                            View demo
                        </Button>
                        <a
                            href='https://github.com/Mastercard/open-banking-reference-application'
                            rel='noreferrer'
                            target='_blank'
                        >
                            <Button
                                endIcon={
                                    <ExternalIcon
                                        data={'#F37338'}
                                        background={'#FFF'}
                                    />
                                }
                                variant='outlined'
                                className='view-on-github__button flex items-center'
                            >
                                View on Github
                            </Button>
                        </a>
                    </Stack>
                </Box>
            </Box>
        </Dialog>
        </React.Fragment>
    );
}
