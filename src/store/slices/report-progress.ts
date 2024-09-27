import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = { progress: 0 };
const reportProgressSlice = createSlice({
    name: 'reportProgress',
    initialState,
    reducers: {
        increaseByvalue(state: any, action: PayloadAction<any>) {
            state.progress += action.payload;
        },
        absoluteValue(state: any, action: PayloadAction<any>) {
            state.progress = action.payload;
        },
    },
});

export const reportProgressActions = reportProgressSlice.actions;
export default reportProgressSlice;
