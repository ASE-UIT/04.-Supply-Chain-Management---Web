import { createSlice } from '@reduxjs/toolkit';
import { orderSliceNamespace } from '../actions/orderActions';
import { IOrderState } from '../models/OrderState';

const initialState: IOrderState = {
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isListing: false,
    data: [],
    error: null,
};

export const orderSlice = createSlice({
    name: orderSliceNamespace,
    initialState,
    reducers: {
        listOrder: (state) => {
            state.isListing = true;
        },
        createOrder: (state, action) => {
            state.isCreating = true;
        },
        updateOrder: (state, action) => {
            state.isUpdating = true;
        },
        removeOrder: (state, action) => {
            state.isDeleting = true;
        },
        setListOrder: (state, action) => {
            state.isListing = false;
            state.data = action.payload;
        },
        setCreateOrder: (state, action) => {
            state.isCreating = false;
            state.data.push(action.payload);
        },
        setUpdateOrder: (state, action) => {
            state.isUpdating = false;
            state.data = state.data.map((item) => item.id === action.payload.id ? action.payload : item);
        },
        setRemoveOrder: (state, action) => {
            state.isDeleting = false;
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        setErrorOrder: (state, action) => {
            state.isCreating = false;
            state.isUpdating = false;
            state.isDeleting = false;
            state.isListing = false;
            state.error = action.payload;
        },
    },
});

export const { listOrder, createOrder, updateOrder, removeOrder, setCreateOrder, setListOrder, setRemoveOrder, setUpdateOrder, setErrorOrder } = orderSlice.actions;
export default orderSlice.reducer;