import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducers";
import partnerReducer from "./partnerReducers";

export default combineReducers({
    user: userReducer,
    partner: partnerReducer,
});