import { createSlice } from '@reduxjs/toolkit';
import { exportSliceNamespace } from '../actions/exportActions';
import { IExportState } from '../models/ExportState';

const initialState: IExportState = {
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isListing: false,
    data: [],
    error: null,
};

export const exportSlice = createSlice({
    name: exportSliceNamespace,
    initialState,
    reducers: {
        listExport: (state) => {
            state.isListing = true;
        },
        createExport: (state, action) => {
            state.isCreating = true;
        },
        updateExport: (state, action) => {
            state.isUpdating = true;
        },
        removeExport: (state, action) => {
            state.isDeleting = true;
        },
        setListExport: (state, action) => {
            state.isListing = false;
            state.data = action.payload;
        },
        setCreateExport: (state, action) => {
            state.isCreating = false;
            state.data.push(action.payload);
        },
        setUpdateExport: (state, action) => {
            state.isUpdating = false;
            state.data = state.data.map((item) => item.id === action.payload.id ? action.payload : item);
        },
        setRemoveExport: (state, action) => {
            state.isDeleting = false;
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        setErrorExport: (state, action) => {
            state.isCreating = false;
            state.isUpdating = false;
            state.isDeleting = false;
            state.isListing = false;
            state.error = action.payload;
        },
    },
});

export const { listExport, createExport, updateExport, removeExport, setCreateExport, setListExport, setRemoveExport, setUpdateExport, setErrorExport } = exportSlice.actions;
export default exportSlice.reducer;