import { configureStore } from '@reduxjs/toolkit';
import reportProgressSlice from './slices/report-progress';
import snackBarSlice from './slices/snackbar';
import accountsRefreshedSlice from './slices/accounts-refreshed';

const store = configureStore({
    reducer: {
        reportProgress: reportProgressSlice.reducer,
        snackbarState: snackBarSlice.reducer,
        accountsRefreshed: accountsRefreshedSlice.reducer,
    },
});

export default store;
