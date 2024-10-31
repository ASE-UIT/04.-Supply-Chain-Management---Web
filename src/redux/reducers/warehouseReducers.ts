import { createSlice } from '@reduxjs/toolkit';
import { warehouseSliceNamespace } from '../actions/warehouseActions';
import { IWarehouseState } from '../models/WarehouseState';

const initialState: IWarehouseState = {
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isListing: false,
    data: [],
    error: null,
};

export const warehouseSlice = createSlice({
    name: warehouseSliceNamespace,
    initialState,
    reducers: {
        listWarehouse: (state) => {
            state.isListing = true;
        },
        createWarehouse: (state, action) => {
            state.isCreating = true;
        },
        updateWarehouse: (state, action) => {
            state.isUpdating = true;
        },
        removeWarehouse: (state, action) => {
            state.isDeleting = true;
        },
        setListWarehouse: (state, action) => {
            state.isListing = false;
            state.data = action.payload;
        },
        setCreateWarehouse: (state, action) => {
            state.isCreating = false;
            state.data.push(action.payload);
        },
        setUpdateWarehouse: (state, action) => {
            state.isUpdating = false;
            state.data = state.data.map((item) => item.id === action.payload.id ? action.payload : item);
        },
        setRemoveWarehouse: (state, action) => {
            state.isDeleting = false;
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        setErrorWarehouse: (state, action) => {
            state.isCreating = false;
            state.isUpdating = false;
            state.isDeleting = false;
            state.isListing = false;
            state.error = action.payload;
        },
    },
});

export const { listWarehouse, createWarehouse, updateWarehouse, removeWarehouse, setCreateWarehouse, setListWarehouse, setRemoveWarehouse, setUpdateWarehouse, setErrorWarehouse } = warehouseSlice.actions;
export default warehouseSlice.reducer;