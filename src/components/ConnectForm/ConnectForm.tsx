import React, { Fragment, useState } from 'react';
import {
    FinicityConnect,
    ConnectEventHandlers,
    ConnectOptions,
    ConnectDoneEvent,
    ConnectCancelEvent,
    ConnectErrorEvent,
} from '@finicity/connect-web-sdk';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Box,
    StepContent,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
    CircularProgress,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';

import {
    Accounts,
    Cards,
    ConnectInitiation,
    Modal,
    SnackBarNotification,
    Usecases,
} from '../../components';
import { PARTNERID, PARTNERSECRET, AUTO_CREATE_CUSTOMER } from '../../config';
import { snackbarActions } from '../../store/slices/snackbar';
import { generateAppToken } from '../../utils/helper';

import './ConnectForm.css';
import {
    activateCustomer,
    generateConnectUrl,
    createConsumer,
    getAccounts,
} from './helper';
import data from './data';
import Steps from './data/Steps';
import validationSchema from './FormModel/connectFormValidation';
import { connectFormModel } from './FormModel/connectFormModel';
import formInitialValues from './FormModel/connectFormInitialValues';
import UserNameForm from './Forms/UserNameForm/UserNameForm';

const { formId, formField } = connectFormModel;

export default function ConnectForm() {
    const dispatch = useDispatch();
    const [appToken, setAppToken] = useState('');
    const [user, setUser] = useState<any>({});
    const [currentCustomerId, setCurrentCustomerId] = useState<string>('');
    const [currentInstitutionLoginId, setCurrentInstitutionLoginId] =
        useState<string>('');
    const [expanded, setExpanded] = useState<string | boolean>('panel0');
    const [activeStep, setActiveStep] = useState(0);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);
    const [accountData, setAccountData] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    /**
     * Handle close event for Modal
     */
    const handleModalClosed = async () => {
        if (AUTO_CREATE_CUSTOMER && activeStep === 0) {
            await initializeApp(
                `customer_${Math.floor(new Date().getTime() / 1000)}`
            );
        }
    };

    /**
     * Initialize aap with authentication and activating customer
     * @param userName unique username for activating customer
     * @param reset is demo resetted
     */
    const initializeApp = async (userName: string, reset = false) => {
        setLoading(true);
        if (activeStep === 0 || reset) {
            let token;
            if (!appToken) {
                token = await generateAppToken({
                    partnerId: PARTNERID,
                    partnerSecret: PARTNERSECRET,
                });

                setAppToken(token);
            }
            if (userName && (token || appToken)) {
                dispatch(
                    snackbarActions.open({
                        message: 'Creating customer',
                        severity: 'info',
                        timeout: 2000,
                    })
                );
                const userResponse = await activateCustomer(userName, {
                    token: token || appToken,
                });
                dispatch(
                    snackbarActions.open({
                        message: 'Customer created',
                        severity: 'success',
                        timeout: 2000,
                    })
                );
                setUser(userResponse);
            }
            setLoading(false);
            handleNext(reset);
        }
    };

    /**
     * Handle submit events for connect form
     * @param userName unique username for activating customer
     * @param resetForm restForm method
     */
    const handleSubmit = async ({ userName }: any, { resetForm }: any) => {
        try {
            dispatch(snackbarActions.close());
            setLoading(true);
            if (activeStep === 0 && !AUTO_CREATE_CUSTOMER) {
                await initializeApp(userName);
                resetForm();
            } else if (activeStep === 1) {
                await openConnect();
            } else if (activeStep === 2) {
                dispatch(
                    snackbarActions.open({
                        message: 'Creating consumer',
                        severity: 'info',
                        timeout: 2000,
                    })
                );
                await createConsumer({ token: appToken, customerId: user?.id });
                dispatch(
                    snackbarActions.open({
                        message: 'Consumer created',
                        severity: 'success',
                        timeout: 2000,
                    })
                );
                handleNext(false);
            } else {
                handleNext();
            }
        } catch (error) {
            console.log(error);
            handleError(error);
        } finally {
            setDisableSubmit(false);
        }
    };

    /**
     * Handle workflow of demo
     * @param skip is next step to be skipped or not
     * @param reset is demo resetted
     */
    const handleNext = (reset = false) => {
        setLoading(false);
        setActiveStep(reset ? 1 : (prevActiveStep) => prevActiveStep + 1);
        setCompletedSteps(
            (reset ? ['panel0'] : completedSteps).concat(
                Steps[activeStep]?.panel
            )
        );
        setExpanded(Steps[reset ? 1 : activeStep + 1]?.panel);
    };

    /**
     * Handle error in demo workflow
     * @param error Error
     */
    const handleError = (error: any = {}) => {
        dispatch(
            snackbarActions.open({ message: error.message, severity: 'error' })
        );
        setLoading(false);
    };

    /**
     * Open connect
     * @param newTab to open connect in new tab or not
     */
    const openConnect = async (newTab = false) => {
        try {
            const connectUrl = await generateConnectUrl({
                token: appToken,
                partnerId: PARTNERID,
                customerId: user?.id,
            });

            if (!newTab) {
                if (typeof window !== 'undefined') {
                    let institutionLogin = '';
                    const connectEventHandlers: ConnectEventHandlers = {
                        onDone: (event: ConnectDoneEvent) => {
                            console.log('onDone', event);
                        },
                        onCancel: (event: ConnectCancelEvent) => {
                            console.log('onCancel', event);
                            setLoading(false);
                        },
                        onError: (event: ConnectErrorEvent) => {
                            console.log('onError', event);
                        },
                        onUser: ({
                            action,
                            code,
                            customerId,
                            institutionLoginId,
                        }: any) => {
                            (async () => {
                                setDisableSubmit(true);
                                if (institutionLoginId) {
                                    institutionLogin = institutionLoginId;
                                    setCurrentInstitutionLoginId(
                                        institutionLoginId
                                    );
                                }
                                if (
                                    action === 'End' &&
                                    code === 200 &&
                                    customerId
                                ) {
                                    setCurrentCustomerId(customerId);
                                    const accData = await getAccounts({
                                        token: appToken,
                                        customerId: user?.id,
                                        institutionLoginId: institutionLogin,
                                    });
                                    setAccountData(accData.accounts);
                                    handleNext(false);
                                }
                                setDisableSubmit(false);
                            })();
                        },
                        onLoad: () => {
                            console.log('loaded');
                        },
                    };
                    const connectOptions: ConnectOptions = {
                        overlay: 'rgba(199,201,199, 0.5);z-index: 10000;',
                    };
                    FinicityConnect.launch(
                        connectUrl,
                        connectEventHandlers,
                        connectOptions
                    );
                }
            }
        } catch (error: any) {
            console.log(error?.message);
            throw error;
        }
    };

    /**
     * Render component based on current step
     * @param step current stepper
     * @returns React component
     */
    const renderFormContent = (step: any): any => {
        accountData.forEach((account: any) => {
            account[
                'displayName'
            ] = `${account.accountNickname} ${account.accountNumberDisplay}`;
        });
        const requestData = {
            customerId: currentCustomerId,
            institutionLoginId: currentInstitutionLoginId,
            token: appToken,
            accountData,
            currentAccount: accountData[0],
            accountDisplayNames: accountData.map(
                (account: any) => account.displayName
            ),
        };
        switch (step) {
            case 0:
                return <UserNameForm formField={formField} />;
            case 1:
                return <ConnectInitiation user={user} />;
            case 2:
                return <Accounts requestData={requestData} />;
            case 3:
                return <Usecases requestData={requestData} />;
            default:
                return <div>Not Found</div>;
        }
    };

    /**
     * Handle reset demo
     */
    const handleReset = async () => {
        dispatch(snackbarActions.close());
        setLoading(false);
        setActiveStep(0);
        setExpanded('panel0');
        setCompletedSteps([]);
        if (AUTO_CREATE_CUSTOMER) {
            await initializeApp(`customer_${Date.now()}`, true);
        }
    };

    /**
     * Check if accordion needs to be disabled or not
     * @param panelId panel id
     * @param index accordion index
     * @param activeStep current step
     * @returns is accordion disabled or not (boolean)
     */
    const checkDisabled = (
        panelId: string,
        index: number,
        activeStep: number
    ): boolean => {
        if (data.fixedAccordions.includes(panelId)) {
            return true;
        }
        return index > activeStep;
    };
    /**
     * Exapand or collapse accordion
     * @param panelId panel Id
     * @returns to expand accordion or not (boolean)
     */
    const checkExpandable = (panelId: string): boolean => {
        return expanded === panelId;
    };

    /**
     * Handle change event for accordions
     * @param panel panel Id
     */
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    /**
     * Get button name based on active step
     * @param activeStep current step
     * @returns button name
     */
    const getFormSubmitName = (activeStep: number) => {
        if (activeStep === 1) {
            return 'Connect Bank Account';
        } else if (activeStep === 2) {
            return 'Explore use cases';
        } else {
            return 'Next';
        }
    };

    return (
        <Fragment>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Box sx={{ maxWidth: 600, height: 500 }}>
                        <Stepper
                            className='create-customer-stepper'
                            activeStep={activeStep}
                            orientation='vertical'
                            sx={{ height: 'inherit' }}
                            data-testid={'stepper'}
                        >
                            {Steps.map((step, index) => (
                                <Step
                                    data-testid={`step-${index}`}
                                    key={step.label}
                                    sx={{
                                        '& .MuiStepLabel-iconContainer .Mui-completed':
                                            {
                                                color: '#F37338', // circle color (COMPLETED)
                                            },
                                        '& .MuiStepLabel-iconContainer .Mui-active':
                                            {
                                                color: '#F37338', // circle color (ACTIVE)
                                            },
                                        '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text':
                                            {
                                                fill: 'white', // circle's number (ACTIVE)
                                            },
                                        '& .MuiStep-root .MuiStepLabel-root .Mui-active':
                                            {
                                                color: '#191AC',
                                            },
                                    }}
                                >
                                    <StepLabel
                                        data-testid={`stepLabel-${index}`}
                                    >
                                        <Step
                                            className='!text-[16px]'
                                            sx={{
                                                fontWeight: 600,
                                                color:
                                                    index === activeStep
                                                        ? {
                                                              color: '#F37338 !important',
                                                          }
                                                        : {
                                                              color: '#B1ADA6 important',
                                                          },
                                            }}
                                        >
                                            {step.label}
                                        </Step>
                                    </StepLabel>
                                    <StepContent
                                        data-testid={`stepContent-${index}`}
                                    >
                                        <Step className='!text-[16px] step'>
                                            {step.description}
                                        </Step>
                                        <a
                                            href={step.documentationLink}
                                            target='_blank'
                                            rel='noreferrer'
                                        >
                                            <Stack
                                                direction='row'
                                                sx={{ marginTop: '40px' }}
                                                spacing={1}
                                            >
                                                <Typography
                                                    variant='caption'
                                                    fontWeight={'bold'}
                                                    color={'#111'}
                                                >
                                                    View docs
                                                </Typography>
                                                <img
                                                    src='/utility.svg'
                                                    alt=''
                                                />
                                            </Stack>
                                        </a>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === 3 && (
                            <Button
                                className='reset-demo__button'
                                onClick={handleReset}
                            >
                                Reset demo
                            </Button>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box>
                        <Formik
                            initialValues={formInitialValues}
                            validationSchema={validationSchema[activeStep]}
                            onSubmit={handleSubmit}
                        >
                            <Form id={formId} data-testid={'form'}>
                                {data.accordions.map((accord, index) => (
                                    <Accordion
                                        className='custom-accordion'
                                        style={{
                                            borderRadius: '11px',
                                            padding: '20px',
                                        }}
                                        key={accord.id}
                                        expanded={
                                            accord.id === 'panel0' &&
                                            AUTO_CREATE_CUSTOMER
                                                ? false
                                                : checkExpandable(accord.id)
                                        }
                                        disabled={checkDisabled(
                                            accord.id,
                                            index,
                                            activeStep
                                        )}
                                        onChange={handleChange(accord.id)}
                                        data-testid={`accordian-${index}`}
                                        sx={{
                                            boxShadow: 4,
                                            width: 'auto',
                                            padding: '5px',
                                            marginBottom: '30px',
                                            '&.Mui-disabled': {
                                                background: 'white',
                                            },
                                        }}
                                    >
                                        <AccordionSummary
                                            data-testid={`accordianSummary-${index}`}
                                            expandIcon={
                                                !checkDisabled(
                                                    accord.id,
                                                    index,
                                                    activeStep
                                                ) && <ArrowDropDownIcon />
                                            }
                                            sx={{
                                                '&.Mui-disabled': {
                                                    opacity: 1,
                                                },
                                                '&::before': {
                                                    backgroundColor: '',
                                                },
                                            }}
                                        >
                                            <Grid
                                                justifyContent='space-between'
                                                container
                                            >
                                                <Grid
                                                    item
                                                    xs={
                                                        accord.id === 'panel0'
                                                            ? 8
                                                            : 10
                                                    }
                                                >
                                                    <Typography
                                                        fontWeight='700'
                                                        sx={{
                                                            width: '45%',
                                                            flexShrink: 0,
                                                            color:
                                                                expanded ===
                                                                accord.id
                                                                    ? {
                                                                          color: '#111111 !important',
                                                                      }
                                                                    : {
                                                                          color: '#B1ADA6 important',
                                                                      },
                                                        }}
                                                    >
                                                        {accord.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={
                                                        accord.id === 'panel0'
                                                            ? 4
                                                            : 2
                                                    }
                                                >
                                                    {activeStep === 0 &&
                                                    accord.id === 'panel0' &&
                                                    AUTO_CREATE_CUSTOMER &&
                                                    loading ? (
                                                        <Typography
                                                            className='float-right'
                                                            fontWeight='700'
                                                            sx={{
                                                                color: '#2D7763 !important',
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    marginTop:
                                                                        '5px',
                                                                }}
                                                            >
                                                                AUTO CREATING
                                                                CUSTOMER
                                                            </span>

                                                            <CircularProgress
                                                                color='inherit'
                                                                size='0.75rem'
                                                                sx={{
                                                                    marginLeft:
                                                                        '10px',
                                                                    top: '50px',
                                                                }}
                                                            />
                                                        </Typography>
                                                    ) : (
                                                        completedSteps.includes(
                                                            accord.id
                                                        ) &&
                                                        data.fixedAccordions.includes(
                                                            accord.id
                                                        ) && (
                                                            <Typography
                                                                className='float-right'
                                                                variant='body2'
                                                                fontWeight='Bold'
                                                                sx={{
                                                                    color: '#2D7763 !important',
                                                                }}
                                                            >
                                                                {accord.id ===
                                                                    'panel0' &&
                                                                AUTO_CREATE_CUSTOMER
                                                                    ? 'AUTO CREATION COMPLETE'
                                                                    : 'COMPLETE'}
                                                            </Typography>
                                                        )
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            data-testid={`accordianDetails-${index}`}
                                        >
                                            <div>
                                                {renderFormContent(
                                                    activeStep > 1
                                                        ? index
                                                        : activeStep
                                                )}
                                            </div>
                                            {data.accordions.length - 1 !==
                                                index && (
                                                <Stack
                                                    direction='row'
                                                    spacing={1}
                                                >
                                                    {activeStep === index &&
                                                        data.accordions.length -
                                                            1 !=
                                                            index && (
                                                            <Button
                                                                data-testid={`submitButton-${index}`}
                                                                disabled={
                                                                    disableSubmit
                                                                }
                                                                type='submit'
                                                                className='connect-form__button'
                                                            >
                                                                {getFormSubmitName(
                                                                    activeStep
                                                                )}
                                                                {loading && (
                                                                    <CircularProgress
                                                                        color='inherit'
                                                                        size='1rem'
                                                                        sx={{
                                                                            marginLeft:
                                                                                '10px',
                                                                        }}
                                                                    />
                                                                )}
                                                            </Button>
                                                        )}
                                                </Stack>
                                            )}
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Form>
                        </Formik>
                        {activeStep > 1 && <Cards />}
                    </Box>
                </Grid>
            </Grid>
            <SnackBarNotification></SnackBarNotification>
            <Modal handleModalClose={handleModalClosed} />
        </Fragment>
    );
}
