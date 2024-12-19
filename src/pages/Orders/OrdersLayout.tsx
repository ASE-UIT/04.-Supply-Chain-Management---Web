"use client";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { Button, Modal, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import CreateOrder from "./CreateOrder";
import { useNavigate, useNavigation } from "react-router-dom";

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
  const navigate = useNavigate();
  const [data, setData] = useState<DataOrder[]>([]);
  const [clickNew, setClickNew] = useState(false);
  const [showConfirmExport, setShowConfirmExport] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number>();

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

  const createOrder = async (data: any) => {
    const res = await MainApiRequest.post("/orders", data);
    if (res.status === 200) {
      await fetchOrders();
    }
    setClickNew(false);
  };

  const handleConfirm = async (id: number) => {
    const res = await MainApiRequest.put(`/orders/${id}/confirm`);
    if (res.status === 200) {
      await fetchOrders();
    }
  }

  const handleCreateExport = async (id: number) => {
    setSelectedOrderId(id);
    setShowConfirmExport(true);
  }

  const confirmExport = async (id?: number) => {
    if (!id) return;

    const res = await MainApiRequest.post(`/warehouses-export/from-order/${id}`);
    if (res.status === 200) {
      navigate(`/export-management`);
    }
  }

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
        <CreateOrder
          visible={clickNew}
          onHide={() => {
            setClickNew(false);
          }}
          onOk={(data) => {
            createOrder(data);
          }}
        />
        <Modal
          title="Confirm Export"
          open={showConfirmExport}
          onOk={() => {
            setShowConfirmExport(false);
            confirmExport(selectedOrderId);
          }}
          onCancel={() => {
            setShowConfirmExport(false);
            setSelectedOrderId(undefined);
          }}
        >
          <p>Do you want to export this order?</p>
        </Modal>
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
              render: (status: string) => {
                return (
                  <Tag color={status === "DRAFT" ? "red" : "green"}>
                    {status}
                  </Tag>
                );
              }
            },
            {
              title: "Actions",
              dataIndex: "actions",
              key: "actions",
              render: (text: any, record: any) => (
                <div className="d-flex flex-md-row flex-column action-button gap-2">
                  <Button onClick={() => { }}>
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button onClick={() => handleDelete(record.id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                  {
                    record.status === "DRAFT" &&
                    <Button
                      onClick={() => {
                        handleConfirm(record.id);
                      }}
                      variant="solid"
                      color="default"
                    >
                      Confirm
                    </Button>
                  }
                  {
                    record.status === "CONFIRMED" &&
                    <Button
                      onClick={() => {
                        handleCreateExport(record.id);
                      }}
                      variant="solid"
                      color="danger"
                    >
                      WH Export
                    </Button>
                  }
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