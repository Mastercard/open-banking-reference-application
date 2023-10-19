import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    ImageList,
} from '@mui/material';

export default function Cards() {
    const cardsData = [
        {
            logo: '/list.svg',
            title: 'API Products',
            description:
                'Check out the full product catalog of Open Banking services from Mastercard',
            href: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/',
            anchorTitle: 'Learn more',
        },
        {
            logo: '/download.svg',
            title: 'Quick start guide',
            description:
                'Learn about key concepts and find out how to quickly connect to our services',
            href: 'https://developer.mastercard.com/open-banking-us/documentation/quick-start-guide/',
            anchorTitle: 'Learn more',
        },
    ];
    return (
        <Box sx={{ width: '100%', marginTop: '35px' }}>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 5 }}
                sx={{ alignContent: 'stretch' }}
            >
                {cardsData.map((card) => (
                    <Grid item xs={6} key={card.title}>
                        <Card
                            sx={{
                                borderRadius: '8px',
                                border: '1px solid var(--gray-2, #E8E5E1)',
                                boxShadow:
                                    '0px 0px 20px 0px rgba(0, 0, 0, 0.10)',
                            }}
                        >
                            <CardContent>
                                <ImageList sx={{ mb: 2 }}>
                                    <img
                                        style={{ height: '28px' }}
                                        src={card.logo}
                                        alt={card.title}
                                        loading='lazy'
                                    />
                                </ImageList>
                                <Typography
                                    variant='h6'
                                    sx={{ mb: 1.5 }}
                                    fontWeight='Bold'
                                    component='div'
                                    className='!text-base'
                                >
                                    {card.title}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    className='!text-base !mb-4'
                                >
                                    {card.description}
                                </Typography>
                                <Typography
                                    sx={{ color: '#F37338 !important' }}
                                >
                                    <a
                                        href={card.href}
                                        target='_blank'
                                        style={{ fontWeight: 1000 }}
                                        rel='noreferrer'
                                        className='!text-sm'
                                    >
                                        {card.anchorTitle}
                                    </a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
