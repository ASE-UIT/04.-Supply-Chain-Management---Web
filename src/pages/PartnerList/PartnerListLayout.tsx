"use client";
import { listPartner, removePartner } from "@/redux/reducers/partnerReducers";
import { RootState } from "@/redux/store";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreatePartner } from "./CreatePartner";
export interface DataPartner {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  type: string;
}

const PartnerListLayout = () => {
  const dispatch = useDispatch();
  const partnerAPI = useSelector((state: RootState) => state.partner.data);
  const [data, setData] = useState<DataPartner[]>([]);

  const [clickNew, setClickNew] = useState(false);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = (id: number) => {
    dispatch(removePartner({ id }));
  };

  useEffect(() => {
    setData(partnerAPI);
  }, [partnerAPI]);

  useEffect(() => {
    dispatch(listPartner());
  }, []);


  return (
    <>
      <div className="m-4">
        <h3>Partners</h3>
        <Button
          className="my-2"
          onClick={handleClickNewButton}
        >
          New Partner
        </Button>
        {clickNew && <CreatePartner onclose={handleClickNewButton} />}
        <Table
          dataSource={data}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Phone",
              dataIndex: "phoneNumber",
              key: "phoneNumber",
            },
            {
              title: "Type",
              dataIndex: "type",
              key: "type",
            },
            {
              title: "Actions",
              key: "actions",
              render: (item: DataPartner) => (
                <div className="d-flex flex-md-row flex-column action-button">
                  <Button onClick={() => { }}>
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button onClick={() => handleDelete(item.id)}>
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

export default PartnerListLayout;
