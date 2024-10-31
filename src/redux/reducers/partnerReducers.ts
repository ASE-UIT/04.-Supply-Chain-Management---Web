import { createSlice } from '@reduxjs/toolkit';
import { partnerSliceNamespace } from '../actions/partnerActions';
import { IPartnerState } from '../models/PartnerState';

const initialState: IPartnerState = {
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isListing: false,
    data: [],
    error: null,
};

export const partnerSlice = createSlice({
    name: partnerSliceNamespace,
    initialState,
    reducers: {
        listPartner: (state) => {
            state.isListing = true;
        },
        createPartner: (state, action) => {
            state.isCreating = true;
        },
        updatePartner: (state, action) => {
            state.isUpdating = true;
        },
        removePartner: (state, action) => {
            state.isDeleting = true;
        },
        setListPartner: (state, action) => {
            state.isListing = false;
            state.data = action.payload;
        },
        setCreatePartner: (state, action) => {
            state.isCreating = false;
            state.data.push(action.payload);
        },
        setUpdatePartner: (state, action) => {
            state.isUpdating = false;
            state.data = state.data.map((item) => item.id === action.payload.id ? action.payload : item);
        },
        setRemovePartner: (state, action) => {
            state.isDeleting = false;
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        setErrorPartner: (state, action) => {
            state.isCreating = false;
            state.isUpdating = false;
            state.isDeleting = false;
            state.isListing = false;
            state.error = action.payload;
        },
    },
});

export const { listPartner, createPartner, updatePartner, removePartner, setCreatePartner, setListPartner, setRemovePartner, setUpdatePartner, setErrorPartner } = partnerSlice.actions;
export default partnerSlice.reducer;