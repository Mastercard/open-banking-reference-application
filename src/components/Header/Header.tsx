import {
    AppBar,
    Toolbar,
    ImageListItem,
    Typography,
    Box,
    Button,
} from '@mui/material';

import { ExternalIcon } from '../../components';

import './Header.css';
import data from './data';

export default function Header() {
    return (
        <AppBar sx={{ background: 'black' }}>
            <Toolbar>
                <ImageListItem sx={{ width: 60 }}>
                    <img src='/mc_symbol.svg' alt='mastercard-logo' />
                </ImageListItem>

                <a
                    href={data.links.openbanking}
                    target='_blank'
                    rel='noreferrer'
                    id='developers-link'
                >
                    <Typography
                        justifyContent='center'
                        padding='2px'
                        className='!text-white'
                    >
                        developers
                    </Typography>
                    <img
                        src='/external_link.svg'
                        alt='external-link'
                        id='external-link'
                    />
                </a>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                    component='div'
                >
                    <Box />
                    <Box textAlign={'center'}>
                        <Typography
                            variant='caption'
                            fontWeight={'500'}
                            color='#B1ADA6'
                        >
                            REFERENCE APP
                        </Typography>
                        <Typography variant='h6'>Open Banking</Typography>
                    </Box>
                    <a
                        href={data.links.github}
                        target='_blank'
                        rel='noreferrer'
                        id='github-link'
                    >
                        <Button
                            id='view-github'
                            endIcon={<ExternalIcon data={'#FFFFFF'} />}
                            variant='outlined'
                            sx={{
                                borderRadius: '25px',
                                borderWidth: '2px',
                                padding: '5px 25px',
                                borderColor: '#FFFFFF',
                                color: 'white',
                            }}
                        >
                            View on Github
                        </Button>
                    </a>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
