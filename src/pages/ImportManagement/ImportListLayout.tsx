"use client";
import DataTable from "@/components/layout/TableLayout/DataTable/DataTable";
import { TableLayout } from "@/components/layout/TableLayout/TableLayout";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ImportListLayout.scss";
import ButtonActionEdit from "@/components/layout/TableLayout/Buttons/ButtonActionEdit";
import ButtonActionDelete from "@/components/layout/TableLayout/Buttons/ButtonActionDelete";
import { listImport, removeImport } from "@/redux/reducers/importReducers";
import { CreateImport } from "@/components/form/createImport/CreateImport";

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
    <TableLayout
      title="Import Management"
    >
      <>
        <DataTable
          dataAPI={data}
          headerRender={() => (
            <tr>
                <th>Import ID</th>
                <th>Arrival Date</th>
                <th>Product Name</th>
                <th>Order Quantity</th>
                <th>Actual Quantity</th>
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
                <td>150</td>
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

export default ImportManagement;
