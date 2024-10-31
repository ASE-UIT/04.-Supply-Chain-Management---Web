import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducers";
import partnerReducer from "./partnerReducers";
import warehouseReducers from "./warehouseReducers";

export default combineReducers({
    user: userReducer,
    partner: partnerReducer,
    warehouse: warehouseReducers,
});