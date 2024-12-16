import { useState } from "react";
import "./CreateExport.scss";
import { useDispatch } from "react-redux";
import { createExport} from "@/redux/reducers/exportReducers";

export const CreateExport = ({ onclose }: any) => {
    const dispatch = useDispatch();
};