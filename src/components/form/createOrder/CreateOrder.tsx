import { useState } from "react";
import "./CreateOrder.scss";
import { useDispatch } from "react-redux";
import { createOrder} from "@/redux/reducers/orderReducers";

export const CreateOrder = ({ onclose }: any) => {
    const dispatch = useDispatch();
};