import { useState } from "react";
import "./CreateCustomer.scss";
import { useDispatch } from "react-redux";
import { createCustomer} from "@/redux/reducers/customerReducers";

export const CreateCustomer = ({ onclose }: any) => {
    const dispatch = useDispatch();
};