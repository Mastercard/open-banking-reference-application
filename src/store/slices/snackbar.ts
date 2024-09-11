import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    open: false,
    message: 'Something went wrong',
    severity: 'error',
    timeout: 5000,
};
const snackBarSlice = createSlice({
    name: 'snackbarState',
    initialState,
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

export const snackbarActions = snackBarSlice.actions;
export default snackBarSlice;
