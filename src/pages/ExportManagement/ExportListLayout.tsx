"use client";
import DataTable from "@/components/layout/TableLayout/DataTable/DataTable";
import { TableLayout } from "@/components/layout/TableLayout/TableLayout";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ExportListLayout.scss";
import ButtonActionEdit from "@/components/layout/TableLayout/Buttons/ButtonActionEdit";
import ButtonActionDelete from "@/components/layout/TableLayout/Buttons/ButtonActionDelete";
import { listExport, removeExport } from "@/redux/reducers/exportReducers";
import { CreateExport } from "@/components/form/createExport/CreateExport";

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
    <TableLayout
      title="Export Management"
    >
      <>
        <DataTable
          dataAPI={data}
          headerRender={() => (
            <tr>
                <th>Import ID</th>
                <th>Departure Date</th>
                <th>Product Name</th>
                <th>Export Quantity</th>
                <th>Warehouse Name</th>
                <th>Price Per Product</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
          )}
          rowRender={(item: any) => (
            <tr>
                <td>I0001</td>
                <td>16/12/2024</td>
                <td>Product 1</td>
                <td>100</td>
                <td>Warehouse 1</td>
                <td>100000</td>
                <td>10000000</td>
                <td>Approved</td>
                <td>
                    <div className="d-flex flex-md-row flex-column action-button">
                    <ButtonActionEdit onClickEdit={() => {}} />
                    <ButtonActionDelete
                        onClickDelete={() => {
                        handleDelete(item.id);
                        }}
                    />
                    </div>
                </td>
            </tr>
          )}
        />
      </>
    </TableLayout>
  );
};

export default ExportManagement;
