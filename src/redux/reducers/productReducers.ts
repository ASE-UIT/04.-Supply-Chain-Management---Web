import { createSlice } from '@reduxjs/toolkit';
import { productSliceNamespace } from '../actions/productActions';
import { IProductState } from '../models/ProductState';

const initialState: IProductState = {
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isListing: false,
    data: [],
    error: null,
};

export const productSlice = createSlice({
    name: productSliceNamespace,
    initialState,
    reducers: {
        listProduct: (state) => {
            state.isListing = true;
        },
        createProduct: (state, action) => {
            state.isCreating = true;
        },
        updateProduct: (state, action) => {
            state.isUpdating = true;
        },
        removeProduct: (state, action) => {
            state.isDeleting = true;
        },
        setListProduct: (state, action) => {
            state.isListing = false;
            state.data = action.payload;
        },
        setCreateProduct: (state, action) => {
            state.isCreating = false;
            state.data.push(action.payload);
        },
        setUpdateProduct: (state, action) => {
            state.isUpdating = false;
            state.data = state.data.map((item) => item.id === action.payload.id ? action.payload : item);
        },
        setRemoveProduct: (state, action) => {
            state.isDeleting = false;
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        setErrorProduct: (state, action) => {
            state.isCreating = false;
            state.isUpdating = false;
            state.isDeleting = false;
            state.isListing = false;
            state.error = action.payload;
        },
    },
});

export const { listProduct, createProduct, updateProduct, removeProduct, setCreateProduct, setListProduct, setRemoveProduct, setUpdateProduct, setErrorProduct } = productSlice.actions;
export default productSlice.reducer;