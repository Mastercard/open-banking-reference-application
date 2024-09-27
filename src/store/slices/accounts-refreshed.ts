import { createSlice } from '@reduxjs/toolkit';

const initialState: any = { refreshed: false };
const accountsRefreshedSlice = createSlice({
    name: 'accountsRefreshed',
    initialState,
    reducers: {
        refreshed(state: any) {
            state.refreshed = true;
        },
    },
});

export const accountsRefreshedActions = accountsRefreshedSlice.actions;
export default accountsRefreshedSlice;
