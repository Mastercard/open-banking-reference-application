import { SyntheticEvent, useEffect, useState } from 'react';
import { Grid, Stack, Tabs, Tab } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { SnackBarNotification } from '../../components';
import { Lend, Manage, Pay } from './components';

import data from './data';
import { snackbarActions } from '../../store/slices/snackbar';

export default function Usecases({ requestData }: any) {
    const dispatch = useDispatch();
    const reportGenerationProgress = useSelector(
        (state: any) => state.reportProgress.progress
    );
    const [canChangeTab, setCanChangeTab] = useState<boolean>(true);
    const [currentUsecase, setCurrentUsecase] = useState<any>('Lend');
    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    useEffect(() => {
        setCanChangeTab(reportGenerationProgress === 0);
    }, [reportGenerationProgress]);

    /**
     * Change tab handler
     * @param event SyntheticEvent
     * @param newValue new tab value
     */
    const handleReportChangeTabs = (
        event: SyntheticEvent,
        newValue: string
    ) => {
        if (canChangeTab) {
            setCurrentUsecase(
                data.usecases.find((report: any) => newValue === report)
            );
        } else {
            dispatch(
                snackbarActions.open({
                    message: data.text.waitForReport,
                    severity: 'warning',
                    timeout: 2000,
                })
            );
        }
    };
    return (
        <Grid
            justifyContent='space-between'
            container
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
        >
            <Grid item xs={12} data-testid={'usecases'}>
                <Grid item xs={12}>
                    <Tabs
                        variant='scrollable'
                        value={currentUsecase}
                        onChange={handleReportChangeTabs}
                        aria-label='basic tabs example'
                    >
                        {data.usecases.map((usecase: any, index: number) => (
                            <Tab
                                data-testid={'tab'}
                                key={usecase}
                                label={usecase}
                                value={usecase}
                                {...a11yProps(index)}
                            />
                        ))}
                    </Tabs>
                    <br />
                    <Stack direction='column' spacing={1}>
                        {currentUsecase === 'Lend' &&
                            'Make confident lending decisions and offer a hassle-free lending experience for your customers. You can generate below mentioned reports for your connected accounts.'}
                        {currentUsecase === 'Manage' &&
                            'Provide a consolidated view of your customers’ finances in a single space to help your customers manage their wealth better.'}
                        {currentUsecase === 'Pay' &&
                            'Provide a seamless payment experience for your customers.'}
                    </Stack>
                </Grid>
                {currentUsecase === 'Lend' && (
                    <Lend requestData={requestData} />
                )}
                {currentUsecase === 'Manage' && (
                    <Manage requestData={requestData} />
                )}
                {currentUsecase === 'Pay' && <Pay requestData={requestData} />}
            </Grid>
            <SnackBarNotification></SnackBarNotification>
        </Grid>
    );
}
