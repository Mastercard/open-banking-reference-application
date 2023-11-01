import React, { useState } from 'react';
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
    Snackbar,
    Alert,
} from '@mui/material';
import { Formik, Form } from 'formik';
import validationSchema from './FormModel/connectFormValidation';
import { connectFormModel } from './FormModel/connectFormModel';
import formInitialValues from './FormModel/connectFormInitialValues';
import UserNameForm from './Forms/UserNameForm/UserNameForm';
import AccountInfo from '../AccountInfo/AccountInfo';
import ConnectInitiation from '../ConnectInitation/ConnectInitiation';
import Cards from '../Cards/Cards';
import {
    ACCORDIANS,
    STEPS,
    PARTNERID,
    URL,
    DEPOSIT_ACCOUNTS,
} from '../../config/config';
import {
    generateFetchHeaders,
    getFetchBody,
} from '../../utils/request-headers';

const { formId, formField } = connectFormModel;
const {
    genTokenUrl,
    activateCustomerUrl,
    genConnectUrl,
    accountInfoUrl,
    mcDevPortal,
    achUrl,
} = URL;

export default function ConnectForm() {
    // useState hooks to manage state variables
    const [expanded, setExpanded] = useState<string | boolean>('panel0');
    const [activeStep, setActiveStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);
    const [appToken, setAppToken] = useState('');
    const [user, setUser] = useState<any>({});
    const [accountData, setAccountData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Something went wrong');
    // Variable to store the connect URL
    let connectUrl = '';
    // Function to handle the 'Next' button click
    const handleNext = () => {
        setOpenSnackbar(false);
        setLoading(false);
        // Increment the activeStep by 1
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // Add the current step to the completedSteps array
        setCompletedSteps(completedSteps.concat(STEPS[activeStep]?.panel));
        // Set the expanded state to the next step panel
        setExpanded(STEPS[activeStep + 1]?.panel);
    };
    // Function to handle the form submission
    const handleSubmit = async ({ userName }: any, { resetForm }: any) => {
        try {
            setLoading(true);
            let token;
            // Generate app token if it doesn't exist
            if (!appToken) {
                token = await generateAppToken();
                setAppToken(token);
            }
            // Activate customer and reset form
            if (userName && (token || appToken)) {
                await activateCustomer(userName, token);
                resetForm();
            }
            // Generate connect URL if on step 1, or go to the next step
            if (activeStep === 1) {
                await generateConnectUrl();
            } else {
                handleNext();
            }
        } catch (error) {
            handleError(error);
        }
    };
    // Function to handle errors
    const handleError = (error: any) => {
        setOpenSnackbar(true);
        setErrorMessage(error.message);
        setLoading(false);
    };
    // Function to handle fetching response and check for errors
    const handleFetchResponse = async (response: any) => {
        if (response.status !== 200 && response.status !== 201) {
            if (response.status === 401) {
                const responseText = await response.text();
                throw new Error(responseText);
            } else if(response.status === 403) {
                throw new Error('Make sure you are located in the US, UK or Canada.');
            } else {
                const { message } = await response.json();
                throw new Error(message);
            }
        }
        return response.json();
    };
    // Function to activate customer
    const activateCustomer = async (
        userName: string,
        token: string = appToken
    ) => {
        try {
            const requestHeaders = generateFetchHeaders('POST', token);
            const raw = JSON.stringify({
                ...getFetchBody('activateCustomer'),
                username: userName,
            });
            const requestOptions = { ...requestHeaders, body: raw };
            const userResponse = await fetch(
                activateCustomerUrl,
                requestOptions
            )
                .then(async (response) => {
                    return handleFetchResponse(response);
                })
                .catch((error) => {
                    console.error('error', error);
                    throw error;
                });
            setUser(userResponse);
        } catch (error: any) {
            console.error(error?.message);
            throw error;
        }
    };
    // Function to generate app token
    const generateAppToken = async () => {
        try {
            const requestHeaders = generateFetchHeaders('POST');
            const raw = JSON.stringify(getFetchBody('generateAppToken'));
            const requestOptions = { ...requestHeaders, body: raw };
            const { token } = await fetch(genTokenUrl, requestOptions)
                .then(async (response) => {
                    return handleFetchResponse(response);
                })
                .catch((error) => {
                    console.error('error', error);
                    throw error;
                });
            return token;
        } catch (error: any) {
            console.error(error?.message);
            throw error;
        }
    };
    // Function to get account information
    const getAccountInformation = async (customerId: string) => {
        try {
            const requestHeaders = generateFetchHeaders('POST', appToken);
            const { accounts } = await fetch(
                accountInfoUrl.replace('<customerId>', customerId),
                requestHeaders
            )
                .then(async (response) => {
                    return handleFetchResponse(response);
                })
                .catch((error) => {
                    console.error('error', error);
                    throw error;
                });
            const achData = await Promise.all(
                getAccountACHInformation(accounts, customerId)
            );
            accounts.forEach((acc: any) => {
                const achInfo = achData.find(
                    ({ accountId }: any) => acc?.id === accountId
                );
                if (achInfo) {
                    acc['achData'] = achInfo;
                }
            });
            setAccountData(accounts);
        } catch (error: any) {
            console.error(error?.message);
            throw error;
        }
    };

    const getAccountACHInformation = (accounts: any, customerId: any) => {
        const requestHeaders = generateFetchHeaders('GET', appToken);
        const depositAccounts = accounts.filter((acc: any) =>
            DEPOSIT_ACCOUNTS.includes(acc.type)
        );
        return depositAccounts.map(({ id }: any) => {
            return fetch(
                achUrl
                    .replace('<customerId>', customerId)
                    .replace('<accountId>', id),
                requestHeaders
            )
                .then(async (response) => {
                    const responseBody = await handleFetchResponse(response);
                    responseBody['accountId'] = id;
                    return responseBody;
                })
                .catch((error) => {
                    console.error('error', error);
                    throw error;
                });
        });
    };

    // Function to generate connect URL
    const generateConnectUrl = async (newTab = false) => {
        try {
            const requestHeaders = generateFetchHeaders('POST', appToken);
            const raw = JSON.stringify({
                partnerId: PARTNERID,
                customerId: user?.id,
            });
            const requestOptions = { ...requestHeaders, body: raw };
            const { link } = await fetch(genConnectUrl, requestOptions)
                .then(async (response) => {
                    return handleFetchResponse(response);
                })
                .catch((error) => {
                    console.error('error', error);
                    throw error;
                });
            connectUrl = link;
            // Launch FinicityConnect if not in new tab mode
            if (!newTab) {
                if (typeof window !== 'undefined') {
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
                        onUser: ({ action, code, customerId }: any) => {
                            if (
                                action === 'End' &&
                                code === 200 &&
                                customerId
                            ) {
                                getAccountInformation(customerId).then(() => {
                                    handleNext();
                                });
                            }
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
            console.error(error?.message);
            throw error;
        }
    };
    // Function to handle reset
    const handleReset = () => {
        setActiveStep(0);
        setOpenSnackbar(false);
        setExpanded('panel0');
        setCompletedSteps([]);
    };
    // Function to render form content based on the active step
    const renderFormContent = (step: any) => {
        switch (step) {
            case 0:
                return <UserNameForm formField={formField} />;
            case 1:
                return <ConnectInitiation user={user} />;
            case 2:
                return <AccountInfo accountData={accountData} />;
            default:
                return <div>Not Found</div>;
        }
    };
    // Function to handle snackbar close
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    // Function to handle panel expansion in accordion
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
        <React.Fragment>
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
                            {STEPS.map((step, index) => (
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
                                        <Step
                                            className='!text-[16px]'
                                            style={{ wordWrap: 'break-word', color: '#111' }}
                                        >
                                            {step.description}
                                        </Step>
                                        <a
                                            href={mcDevPortal}
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
                        {activeStep === 2 && (
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
                            <Form
                                id={formId}
                                style={{ width: 'inherit' }}
                                data-testid={'form'}
                            >
                                {ACCORDIANS.map((accord, index) => (
                                    <Accordion
                                        className='custom-accordion'
                                        key={accord.id}
                                        style={{
                                            borderRadius: '11px',
                                            padding: '20px',
                                        }}
                                        expanded={expanded === accord.id}
                                        disabled={true}
                                        onChange={handleChange(accord.nextId)}
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
                                                <Grid item xs={10}>
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
                                                <Grid item xs={2}>
                                                    {completedSteps.includes(
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
                                                            COMPLETE
                                                        </Typography>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            data-testid={`accordianDetails-${index}`}
                                        >
                                            <div>
                                                {renderFormContent(activeStep)}
                                            </div>
                                            {ACCORDIANS.length - 1 !==
                                                index && (
                                                <Stack
                                                    direction='row'
                                                    spacing={1}
                                                >
                                                    <Button
                                                        data-testid={`submitButton-${index}`}
                                                        type='submit'
                                                        className='connect-form__button'
                                                    >
                                                        {activeStep === 1
                                                            ? 'Connect Bank Account'
                                                            : 'Next'}
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
                                                </Stack>
                                            )}
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Form>
                        </Formik>
                        {activeStep === 2 && <Cards />}
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={openSnackbar}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleClose}
                    severity='error'
                    sx={{
                        width: '100%',
                        backgroundColor: '#FF5555',
                        color: '#FFFFFF',
                    }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}
