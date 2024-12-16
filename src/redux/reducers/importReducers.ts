import { createSlice } from '@reduxjs/toolkit';
import { importSliceNamespace } from '../actions/importActions';
import { IImportState } from '../models/ImportState';

const initialState: IImportState = {
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isListing: false,
    data: [],
    error: null,
};

export const importSlice = createSlice({
    name: importSliceNamespace,
    initialState,
    reducers: {
        listImport: (state) => {
            state.isListing = true;
        },
        createImport: (state, action) => {
            state.isCreating = true;
        },
        updateImport: (state, action) => {
            state.isUpdating = true;
        },
        removeImport: (state, action) => {
            state.isDeleting = true;
        },
        setListImport: (state, action) => {
            state.isListing = false;
            state.data = action.payload;
        },
        setCreateImport: (state, action) => {
            state.isCreating = false;
            state.data.push(action.payload);
        },
        setUpdateImport: (state, action) => {
            state.isUpdating = false;
            state.data = state.data.map((item) => item.id === action.payload.id ? action.payload : item);
        },
        setRemoveImport: (state, action) => {
            state.isDeleting = false;
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        setErrorImport: (state, action) => {
            state.isCreating = false;
            state.isUpdating = false;
            state.isDeleting = false;
            state.isListing = false;
            state.error = action.payload;
        },
    },
});

export const { listImport, createImport, updateImport, removeImport, setCreateImport, setListImport, setRemoveImport, setUpdateImport, setErrorImport } = importSlice.actions;
export default importSlice.reducer;