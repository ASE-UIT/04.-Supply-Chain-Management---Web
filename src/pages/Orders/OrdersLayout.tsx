"use client";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";

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
  const [data, setData] = useState<DataOrder[]>([]);

  const [clickNew, setClickNew] = useState(false);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = async (id: number) => {
    await MainApiRequest.delete(`/orders/${id}`);
    fetchOrders();
  };

  const fetchOrders = async () => {
    const res = await MainApiRequest.get("/orders/list");
    setData(res.data);
  };

  useEffect(() => {
    if (!data.length) {
      fetchOrders()
    }
  }, []);

  return (
    <>
      <div className="m-4">
        <h3>Orders</h3>
        <Button
          className="my-2"
          onClick={handleClickNewButton}
        >
          New Order
        </Button>
        <Table
          dataSource={data}
          columns={[
            {
              title: "Order Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Customer Name",
              dataIndex: "customer",
              render: (customer: any) => customer.name,
            },
            {
              title: "Remark",
              dataIndex: "remark",
              key: "remark",
            },
            {
              title: "Total",
              dataIndex: "total",
              key: "total",
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
            },
            {
              title: "Actions",
              dataIndex: "actions",
              key: "actions",
              render: (text: any, record: any) => (
                <div className="d-flex flex-md-row flex-column action-button">
                  <Button onClick={() => { }}>
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button onClick={() => handleDelete(record.id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};

export default OrderManagement;