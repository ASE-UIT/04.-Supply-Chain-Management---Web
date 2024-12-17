import { createSlice } from '@reduxjs/toolkit';
import { customerSliceNamespace } from '../actions/customerActions';
import { ICustomerState } from '../models/CustomerState';

const initialState: ICustomerState = {
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isListing: false,
    data: [],
    error: null,
};

export const customerSlice = createSlice({
    name: customerSliceNamespace,
    initialState,
    reducers: {
        listCustomer: (state) => {
            state.isListing = true;
        },
        createCustomer: (state, action) => {
            state.isCreating = true;
        },
        updateCustomer: (state, action) => {
            state.isUpdating = true;
        },
        removeCustomer: (state, action) => {
            state.isDeleting = true;
        },
        setListCustomer: (state, action) => {
            state.isListing = false;
            state.data = action.payload;
        },
        setCreateCustomer: (state, action) => {
            state.isCreating = false;
            state.data.push(action.payload);
        },
        setUpdateCustomer: (state, action) => {
            state.isUpdating = false;
            state.data = state.data.map((item) => item.id === action.payload.id ? action.payload : item);
        },
        setRemoveCustomer: (state, action) => {
            state.isDeleting = false;
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        setErrorCustomer: (state, action) => {
            state.isCreating = false;
            state.isUpdating = false;
            state.isDeleting = false;
            state.isListing = false;
            state.error = action.payload;
        },
    },
});

export const { listCustomer, createCustomer, updateCustomer, removeCustomer, setCreateCustomer, setListCustomer, setRemoveCustomer, setUpdateCustomer, setErrorCustomer } = customerSlice.actions;
export default customerSlice.reducer;