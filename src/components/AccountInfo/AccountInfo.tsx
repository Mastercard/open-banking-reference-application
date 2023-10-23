import {
    Chip,
    Divider,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material';
import ExternalIcon from '../../utils/external-icon';
import React, { useState } from 'react';
import { ACHTEXT, AVAILBTEXT } from '../../config/config';
export default function AccountInfo({ accountData }: any) {
    // State to manage the selected account
    const [account, setAccount] = useState(accountData[0]);
    // Event handler for changing the selected account
    const handleChangeAccount = (event: SelectChangeEvent) => {
        // Find the selected account from accountData based on the chosen value
        const accountElem = accountData.find((accValue: any) =>
            event.target.value.includes(
                `${accValue.accountNickname}-${accValue.accountNumberDisplay}`
            )
        );
        setAccount(accountElem);
    };
    return (
        <React.Fragment>
            <Grid
                justifyContent='space-between'
                container
                columnSpacing={{ xs: 2, sm: 3, md: 4 }}
            >
                <Grid item xs={12}>
                    {/* Display the number of connected accounts */}
                    <Stack direction='column' spacing={1}>
                        <Typography variant='subtitle1'>
                            You’ve successfully connected{' '}
                            <span className='text-gray-700'>
                                {accountData.length} accounts.
                            </span>
                        </Typography>
                    </Stack>
                    {/* Dropdown to select connected accounts */}
                    <Stack direction='column' spacing={1}>
                        <Typography className='text-gray-700'>
                            Connected accounts:
                        </Typography>
                        <Select
                            labelId='account-select-label'
                            id='account-select'
                            value={`${account.accountNickname}-${account.accountNumberDisplay}`}
                            onChange={handleChangeAccount}
                            className='w-[320px] h-10'
                        >
                            {/* Map through accountData to display each connected account */}
                            {accountData.map((acc: any) => (
                                <MenuItem
                                    value={`${acc.accountNickname}-${acc.accountNumberDisplay}`}
                                    key={acc.id}
                                >{`${acc.accountNickname}-${acc.accountNumberDisplay}`}</MenuItem>
                            ))}
                        </Select>
                    </Stack>
                </Grid>
                <Grid item xs={12} className='!mt-10'>
                    <Divider />
                </Grid>
                {/* Display ACH details for the selected account */}
                {account?.achData && (
                    <>
                        <Grid item xs={12} className='!mt-10 '>
                            <Stack direction='row' spacing={2}>
                                <Chip
                                    label='GET'
                                    color='success'
                                    className='bg-green-600 text-white !rounded-md !px-2 !pb-0 !text-[10px] !h-[25px]'
                                />
                                <Typography
                                    fontWeight='700'
                                    align='center'
                                    className='text-gray-700'
                                >
                                    ACCOUNT ACH DETAILS
                                </Typography>
                                <a
                                    href='https://developer.mastercard.com/open-banking-us/documentation/api-reference/'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <ExternalIcon
                                        data={'#F37338'}
                                        background={'#FFF'}
                                    />
                                </a>
                            </Stack>
                        </Grid>
                        {/* Display routing number and real account number */}
                        <Grid item xs={12} className='mt-2 !ml-20 !mb-4'>
                            <Typography variant='subtitle1'>
                                {ACHTEXT}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className='!mt-2 !ml-8'>
                            <Stack direction='row' spacing={2}>
                                <Typography
                                    variant='body2'
                                    fontWeight='bold'
                                    className='account-info__label'
                                >
                                    routingNumber :
                                </Typography>
                                <Typography
                                    className='text-gray-700'
                                    data-testid='routing-number'
                                >
                                    "{account?.achData?.routingNumber || 'NA'}"
                                </Typography>
                            </Stack>
                            <Stack direction='row' spacing={2} className='mt-2'>
                                <Typography
                                    variant='body2'
                                    fontWeight='bold'
                                    className='account-info__label'
                                >
                                    realAccountNumber :
                                </Typography>
                                <Typography
                                    className='text-gray-700'
                                    data-testid='real-account-number'
                                >
                                    "
                                    {account?.achData?.realAccountNumber ||
                                        'NA'}
                                    "
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} className='!mt-10'>
                            <Divider />
                        </Grid>
                    </>
                )}
                {/* Display available balance details */}
                <Grid item xs={12} className='!mt-10'>
                    <Stack direction='row' spacing={2}>
                        <Chip
                            label='GET'
                            color='success'
                            className='bg-green-600 text-white !rounded-md !px-2 !pb-0 !text-[10px] !h-[25px]'
                        />
                        <Typography
                            fontWeight='700'
                            align='center'
                            className='text-gray-700'
                        >
                            AVAILABLE BALANCE
                        </Typography>
                        <a
                            href='https://developer.mastercard.com/open-banking-us/documentation/api-reference/'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <ExternalIcon
                                data={'#F37338'}
                                background={'#FFF'}
                            />
                        </a>
                    </Stack>
                </Grid>
                {/* Display additional account details */}
                <Grid item xs={12} className='mt-2 !ml-20 !mb-4'>
                    <Typography variant='subtitle1'>{AVAILBTEXT}</Typography>
                </Grid>
                <Grid item xs={12} className='!mt-2 !ml-8'>
                    <Stack direction='row' spacing={2}>
                        <Typography
                            variant='body2'
                            className='account-info__label'
                            fontWeight='bold'
                        >
                            id :
                        </Typography>
                        <Typography
                            className='text-gray-700'
                            data-testid='account-id'
                        >
                            "{account?.id}"
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} className='!mt-2 !ml-8'>
                    <Stack direction='row' spacing={2}>
                        <Typography
                            variant='body2'
                            className='account-info__label'
                            fontWeight='bold'
                        >
                            realAccountNumberLast4 :
                        </Typography>
                        <Typography
                            className='text-gray-700'
                            data-testid='real-account-number-last-4'
                        >
                            "{account?.realAccountNumberLast4}"
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} className='!mt-2 !ml-8'>
                    <Stack direction='row' spacing={2}>
                        <Typography
                            variant='body2'
                            className='account-info__label'
                            fontWeight='bold'
                        >
                            availableBalance :
                        </Typography>
                        <Typography
                            className='text-gray-700'
                            data-testid='available-balance'
                        >
                            {account?.detail?.availableBalanceAmount}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} className='!mt-2 !ml-8'>
                    <Stack direction='row' spacing={2}>
                        <Typography
                            variant='body2'
                            className='account-info__label'
                            fontWeight='bold'
                        >
                            availableBalanceDate :
                        </Typography>
                        <Typography
                            className='text-gray-700'
                            data-testid='available-balance-date'
                        >
                            {new Date(
                                account?.balanceDate * 1000
                            ).toDateString()}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} className='!mt-2 !ml-8'>
                    <Stack direction='row' spacing={2}>
                        <Typography
                            variant='body2'
                            className='account-info__label'
                            fontWeight='bold'
                        >
                            clearedBalance :
                        </Typography>
                        <Typography
                            className='text-gray-700'
                            data-testid='cleared-balance'
                        >
                            {account?.balance}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} className='!mt-2 !ml-8'>
                    <Stack direction='row' spacing={2}>
                        <Typography
                            variant='body2'
                            className='account-info__label'
                            fontWeight='bold'
                        >
                            clearedBalancedate :
                        </Typography>
                        <Typography
                            className='text-gray-700'
                            data-testid='cleared-balance-date'
                        >
                            {new Date(
                                account?.balanceDate * 1000
                            ).toDateString()}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} className='!mt-2 !ml-8'>
                    <Stack direction='row' spacing={2}>
                        <Typography
                            variant='body2'
                            className='account-info__label'
                            fontWeight='bold'
                        >
                            currency :
                        </Typography>
                        <Typography
                            className='text-gray-700'
                            data-testid='currency'
                        >
                            "{account?.currency}"
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
