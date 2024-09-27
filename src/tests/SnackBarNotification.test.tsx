import { render, screen } from '@testing-library/react';
import SnackBarNotificaton from '../components/SnackBarNotification/SnackBarNotification';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

describe('Testing Snack Bar Component', () => {
    beforeEach(() => {
        jest.restoreAllMocks(); // Restores all mocks to their original implementation
        jest.resetAllMocks();
    });
    test('Should open snack bar when severity error', () => {
        const snackBarSlice = createSlice({
            name: 'reportProgress',
            initialState: {
                open: true,
                message: 'Something went wrong',
                severity: 'error',
                timeout: 5000,
            },
            reducers: {
                open(state: any, action: PayloadAction<any>) {
                    state.open = true;
                    state.severity = action.payload.severity || state.severity;
                    state.message =
                        action.payload.message ||
                        (state.severity === 'error'
                            ? 'Something went wrong'
                            : state.message);
                    state.timeout = action.payload.timeout || state.timeout;
                },
                close(state: any) {
                    state.open = false;
                },
            },
        });
        const mockStore = configureStore({
            reducer: { snackbarState: snackBarSlice.reducer },
        });
        render(
            (
                <Provider store={mockStore}>
                    <SnackBarNotificaton />
                </Provider>
            ) as React.ReactElement
        );
        const element = screen.queryByTestId('snackbar-message');
        expect(element?.textContent).toEqual('Something went wrong');
    });

    test('Should open snack bar when severity sucess', () => {
        const snackBarSlice = createSlice({
            name: 'reportProgress',
            initialState: {
                open: true,
                message: 'Something went wrong',
                severity: 'success',
                timeout: 5000,
            },
            reducers: {
                open(state: any, action: PayloadAction<any>) {
                    state.open = true;
                    state.severity = action.payload.severity || state.severity;
                    state.message =
                        action.payload.message ||
                        (state.severity === 'error'
                            ? 'Something went wrong'
                            : state.message);
                    state.timeout = action.payload.timeout || state.timeout;
                },
                close(state: any) {
                    state.open = false;
                },
            },
        });
        const mockStore = configureStore({
            reducer: { snackbarState: snackBarSlice.reducer },
        });
        render(
            (
                <Provider store={mockStore}>
                    <SnackBarNotificaton />
                </Provider>
            ) as React.ReactElement
        );
        const element = screen.queryByTestId('snackbar-message');
        expect(element?.textContent).toEqual('Something went wrong');
    });

    test('Should open snack bar when severity warning', async () => {
        const snackBarSlice = createSlice({
            name: 'reportProgress',
            initialState: {
                open: true,
                message: 'Something went wrong',
                severity: 'warning',
                timeout: 1,
            },
            reducers: {
                open(state: any, action: PayloadAction<any>) {
                    state.open = true;
                    state.severity = action.payload.severity || state.severity;
                    state.message =
                        action.payload.message ||
                        (state.severity === 'error'
                            ? 'Something went wrong'
                            : state.message);
                    state.timeout = action.payload.timeout || state.timeout;
                },
                close(state: any) {
                    state.open = false;
                },
            },
        });
        const mockStore = configureStore({
            reducer: { snackbarState: snackBarSlice.reducer },
        });
        render(
            (
                <Provider store={mockStore}>
                    <SnackBarNotificaton />
                </Provider>
            ) as React.ReactElement
        );
        const element = screen.queryByTestId('snackbar-message');
        expect(element?.textContent).toEqual('Something went wrong');
        await screen.findByText('Something went wrong', {}, { timeout: 30 });
    });
});
