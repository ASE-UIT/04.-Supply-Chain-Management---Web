import { combineReducers } from "@reduxjs/toolkit";
import userReducers from "./userReducers";
import partnerReducers from "./partnerReducers";
import warehouseReducers from "./warehouseReducers";
import productReducers from "./productReducers";

export default combineReducers({
    user: userReducers,
    partner: partnerReducers,
    warehouse: warehouseReducers,
    product: productReducers,
});