"use client";
import { CreateDriver } from "./CreateDriver";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { removeDriver } from "@/redux/reducers/driverReducers";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export enum LicenseType {
  B2 = "B2",
  C = "C",
  D = "D",
  E = "E",
}

export interface DataDriver {
  id: number;
  name: string;
  phoneNumber: string;
  licenseType: LicenseType;
  licenseNumber: string;
}

const DriverListLayout = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<DataDriver[]>([]);

  const [clickNew, setClickNew] = useState(false);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = async (id: number) => {
    // dispatch(removeDriver({ id }));
    await MainApiRequest.delete(`/drivers/${id}`);
    fetchDrivers();
  };

  const fetchDrivers = async () => {
    const res = await MainApiRequest.get("/drivers/list");
    setData(res.data);
  };

  useEffect(() => {
    if (!data.length) {
      fetchDrivers();
    }
  }, []);

  const handleFinishCreate = () => {
    setClickNew(false);
    fetchDrivers();
  };

  return (
    <>
      <div className="m-4">
        <h3>Drivers</h3>
        <Button
          className="my-2"
          onClick={handleClickNewButton}
        >
          New Driver
        </Button>
        <CreateDriver
          onclose={handleClickNewButton}
          onsubmit={handleFinishCreate}
          visible={clickNew}
        />
        <Table
          dataSource={data}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Phone",
              dataIndex: "phoneNumber",
              key: "phoneNumber",
            },
            {
              title: "License Number",
              dataIndex: "licenseNumber",
              key: "licenseNumber",
            },
            {
              title: "License Type",
              dataIndex: "licenseType",
              key: "licenseType",
            },
            {
              title: "Actions",
              key: "actions",
              render: (text: any, record: DataDriver) => (
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

export default DriverListLayout;
