import { createSlice } from "@reduxjs/toolkit";
import { driverSliceNamespace } from "../actions/driverActions";
import { IDriverState } from "../models/DriverState";

const initialState: IDriverState = {
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isListing: false,
  data: [],
  error: null
};

export const driverSlice = createSlice({
  name: driverSliceNamespace,
  initialState,
  reducers: {
    listDriver: (state) => {
      state.isListing = true;
    },
    createDriver: (state, action) => {
      state.isCreating = true;
    },
    updateDriver: (state, action) => {
      state.isUpdating = true;
    },
    removeDriver: (state, action) => {
      state.isDeleting = true;
    },
    setListDriver: (state, action) => {
      state.isListing = false;
      state.data = action.payload;
    },
    setCreateDriver: (state, action) => {
      state.isCreating = false;
      state.data.push(action.payload);
    },
    setUpdateDriver: (state, action) => {
      state.isUpdating = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    setRemoveDriver: (state, action) => {
      state.isDeleting = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    setErrorDriver: (state, action) => {
      state.isCreating = false;
      state.isUpdating = false;
      state.isDeleting = false;
      state.isListing = false;
      state.error = action.payload;
    }
  }
});

export const {
  listDriver,
  createDriver,
  updateDriver,
  removeDriver,
  setCreateDriver,
  setListDriver,
  setRemoveDriver,
  setUpdateDriver,
  setErrorDriver
} = driverSlice.actions;
export default driverSlice.reducer;
