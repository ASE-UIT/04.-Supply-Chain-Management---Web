"use client";
import { listImport, removeImport } from "@/redux/reducers/importReducers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export interface DataImport {
  id: number;
  arrivalDate: Date;
  productName: string;
  orderQuantity: number;
  actualQuantity: number;
  warehouseName: string;
  pricePerProduct: number;
  totalPrice: number;
  status: string;
}

const ImportManagement = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<DataImport[]>([]);

  const [clickNew, setClickNew] = useState(false);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = (id: number) => {
    dispatch(removeImport({ id }));
  };

  useEffect(() => {
    dispatch(listImport());
  }, []);

  return (
    <>
      <div className="m-4">
        <h3>Import</h3>
      </div>
    </>
  );
};

export default ImportManagement;
