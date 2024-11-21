import { createSlice } from '@reduxjs/toolkit';
import { legalpersonSliceNamespace } from '../actions/legalpersonActions';
import { ILegalPersonState } from '../models/LegalPersonState';

const initialState: ILegalPersonState = {
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isListing: false,
    data: [],
    error: null,
};

export const legalpersonSlice = createSlice({
    name: legalpersonSliceNamespace,
    initialState,
    reducers: {
        listLegalPerson: (state) => {
            state.isListing = true;
        },
        createLegalPerson: (state, action) => {
            state.isCreating = true;
        },
        updateLegalPerson: (state, action) => {
            state.isUpdating = true;
        },
        removeLegalPerson: (state, action) => {
            state.isDeleting = true;
        },
        setListLegalPerson: (state, action) => {
            state.isListing = false;
            state.data = action.payload;
        },
        setCreateLegalPerson: (state, action) => {
            state.isCreating = false;
            state.data.push(action.payload);
        },
        setUpdateLegalPerson: (state, action) => {
            state.isUpdating = false;
            state.data = state.data.map((item) => item.id === action.payload.id ? action.payload : item);
        },
        setRemoveLegalPerson: (state, action) => {
            state.isDeleting = false;
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        setErrorLegalPerson: (state, action) => {
            state.isCreating = false;
            state.isUpdating = false;
            state.isDeleting = false;
            state.isListing = false;
            state.error = action.payload;
        },
    },
});

export const { listLegalPerson, createLegalPerson, updateLegalPerson, removeLegalPerson, setCreateLegalPerson, setListLegalPerson, setRemoveLegalPerson, setUpdateLegalPerson, setErrorLegalPerson } = legalpersonSlice.actions;
export default legalpersonSlice.reducer;