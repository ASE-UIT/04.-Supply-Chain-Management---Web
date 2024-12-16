import { createSlice } from '@reduxjs/toolkit';
import { vehicleSliceNamespace } from '../actions/vehicleActions';
import { IVehicleState } from '../models/VehicleState';

const initialState: IVehicleState = {
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isListing: false,
    data: [],
    error: null,
};

export const vehicleSlice = createSlice({
    name: vehicleSliceNamespace,
    initialState,
    reducers: {
        listVehicle: (state) => {
            state.isListing = true;
        },
        createVehicle: (state, action) => {
            state.isCreating = true;
        },
        updateVehicle: (state, action) => {
            state.isUpdating = true;
        },
        removeVehicle: (state, action) => {
            state.isDeleting = true;
        },
        setListVehicle: (state, action) => {
            state.isListing = false;
            state.data = action.payload;
        },
        setCreateVehicle: (state, action) => {
            state.isCreating = false;
            state.data.push(action.payload);
        },
        setUpdateVehicle: (state, action) => {
            state.isUpdating = false;
            state.data = state.data.map((item) => item.id === action.payload.id ? action.payload : item);
        },
        setRemoveVehicle: (state, action) => {
            state.isDeleting = false;
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        setErrorVehicle: (state, action) => {
            state.isCreating = false;
            state.isUpdating = false;
            state.isDeleting = false;
            state.isListing = false;
            state.error = action.payload;
        },
    },
});

export const { listVehicle, createVehicle, updateVehicle, removeVehicle, setCreateVehicle, setListVehicle, setRemoveVehicle, setUpdateVehicle, setErrorVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;