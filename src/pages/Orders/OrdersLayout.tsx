"use client";
import DataTable from "@/components/layout/TableLayout/DataTable/DataTable";
import { TableLayout } from "@/components/layout/TableLayout/TableLayout";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./OrdersLayout.scss";
import ButtonActionEdit from "@/components/layout/TableLayout/Buttons/ButtonActionEdit";
import ButtonActionDelete from "@/components/layout/TableLayout/Buttons/ButtonActionDelete";
import { CreateOrder } from "@/components/form/createOrder/CreateOrder";
import { listOrder, removeOrder } from "@/redux/reducers/orderReducers";

export interface DataOrder {
  id: number;
  customerName: string;
  warehouseName: string;
  productName: string;
  quantity: number;
  orderDate: Date;
  totalPrice: number;
  status: string;
}

const OrderManagement = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<DataOrder[]>([]);

  const [clickNew, setClickNew] = useState(false);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = (id: number) => {
    dispatch(removeOrder({ id }));
  };

  useEffect(() => {
    dispatch(listOrder());
  }, []);

  return (
    <TableLayout
      title="Purchase Orders"
    >
      <>
        <DataTable
          dataAPI={data}
          headerRender={() => (
            <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Warehouse Name</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
          )}
          rowRender={(item: any) => (
            <tr>
                <td>I0001</td>
                <td>Customer 1</td>
                <td>Warehouse 1</td>
                <td>Product 1</td>
                <td>100</td>
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

export default OrderManagement;