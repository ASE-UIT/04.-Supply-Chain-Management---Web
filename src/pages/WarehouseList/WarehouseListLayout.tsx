"use client";
import { CreateWarehouse } from "./CreateWarehouse";
//import TabButton from "../tabButton/TabButton";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { listWarehouse } from "@/redux/reducers/warehouseReducers";
import { RootState } from "@/redux/store";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export interface DataWarehouse {
  id: number,
  name: string,
  address: string,
  type: string,
  capacity: number,
  availability: boolean,
  partner: any,
}
const WarehouseListLayout = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const warehouseAPI = useSelector((state: RootState) => state.warehouse.data);
  const [data, setData] = useState<DataWarehouse[]>([]);
  const [clickNew, setClickNew] = useState(false);

  useEffect(() => {
    dispatch(listWarehouse())
  }, []);

  useEffect(() => {
    setData(warehouseAPI);
  }, [warehouseAPI]);

  const openDetailWarehouse = (id: number) => {
    navigation(`/warehouse/${id}`);
  }

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  }

  const handleDelete = async (id: number) => {
    await MainApiRequest.delete(`/warehouses/${id}`);
    dispatch(listWarehouse())
  }

  return (
    <>
      <div className="m-4">
        <h3>Warehouses</h3>
        <Button
          className="my-2"
          onClick={handleClickNewButton}
        >
          New Warehouse
        </Button>
        {clickNew && <CreateWarehouse onclose={handleClickNewButton} />}
        <Table
          dataSource={data}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Address",
              dataIndex: "address",
            },
            {
              title: "Owner",
              dataIndex: "partner",
              render: (partner: any) => partner.name,
            },
            {
              title: "Capacity (m3)",
              dataIndex: "capacity",
            },
            {
              title: "Type",
              dataIndex: "type",
            },
            {
              title: "Avalability",
              dataIndex: "availability",
              render: (availability: boolean) => availability ? 'Yes' : 'No',
            },
            {
              title: "Action",
              dataIndex: "id",
              render: (id: number) => (
                <div className="d-flex flex-md-row flex-column action-button">
                  <Button onClick={() => openDetailWarehouse(id)}>
                    <i className="fas fa-eye"></i>
                  </Button>
                  <Button onClick={() => { }}>
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button onClick={() => handleDelete(id)}>
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

export default WarehouseListLayout;
