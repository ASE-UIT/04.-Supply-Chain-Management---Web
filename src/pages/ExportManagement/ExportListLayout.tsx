"use client";
import { listExport, removeExport } from "@/redux/reducers/exportReducers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export interface DataExport {
  id: number;
  departureDate: Date;
  productName: string;
  exportQuantity: number;
  warehouseName: string;
  pricePerProduct: number;
  totalPrice: number;
  status: string;
}

const ExportManagement = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<DataExport[]>([]);

  const [clickNew, setClickNew] = useState(false);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = (id: number) => {
    dispatch(removeExport({ id }));
  };

  useEffect(() => {
    dispatch(listExport());
  }, []);

  return (
    <>
      <div className="m-4">
        <h3>Export</h3>
      </div>
    </>
  );
};

export default ExportManagement;
