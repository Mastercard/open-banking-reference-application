import { useState } from 'react';
import { Box, Button, Dialog, Link, Stack, Typography } from '@mui/material';

import { ExternalIcon } from '../../components';

import './Modal.css';
import data from './data';

import { PARTNERID, PARTNERSECRET, APP_KEY } from '../../config';

export default function Modal({ handleModalClose }: any) {
    const [open, setOpen] = useState(!!(PARTNERID && PARTNERSECRET && APP_KEY));

    /**
     * Handle close event handler for modal close
     */
    const handleClose = async () => {
        setOpen(false);
        if (handleModalClose) {
            await handleModalClose();
        }
    };

    return (
        <Dialog
            data-testid={'modal-component'}
            open={open}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <Box className='modal-dialog-parent'>
                <Box className='modal-dialog-content'>
                    <Typography variant='h6' className='flex !font-semibold'>
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
                        <Typography className='open-banking-text'>
                            Open Banking
                        </Typography>
                        <Typography className=''>
                            {data.text.description}
                        </Typography>
                        <Stack
                            direction='row'
                            spacing={1}
                            alignItems='flex-start'
                            sx={{ mt: 1.5 }}
                        >
                            <Link
                                variant='caption'
                                href={data.link.product}
                                target='_blank'
                                className='!no-underline'
                                fontWeight={'bold'}
                                color={'#111'}
                            >
                                {data.text.more}
                            </Link>
                            <img
                                id='product-img'
                                src='/utility.svg'
                                alt='product-img'
                            />
                        </Stack>
                    </Box>

                    <Stack direction='row' className='gap-2'>
                        <Button
                            variant='text'
                            onClick={handleClose}
                            className='demo__button flex items-center'
                            data-testid={'modal-close'}
                        >
                            View demo
                        </Button>
                        <a
                            href={data.link.github}
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
    );
}
