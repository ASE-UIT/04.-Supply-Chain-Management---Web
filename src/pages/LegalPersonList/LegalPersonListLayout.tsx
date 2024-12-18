"use client";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { listLegalPerson } from "@/redux/reducers/legalpersonReducers";
import { RootState } from "@/redux/store";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateLegalPerson } from "./CreateLegalPerson";

export interface DataLegalPerson {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  adress: string;
  identityNumber: string;
}

const LegalPersonListLayout = () => {
  const dispatch = useDispatch();
  const legalpersonAPI = useSelector((state: RootState) => state.legalperson.data);
  const [data, setData] = useState<DataLegalPerson[]>([]);

  const [clickNew, setClickNew] = useState(false);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = async (id: number) => {
    // dispatch(removeLegalPerson({ id }));
    await MainApiRequest.delete(`/legal-persons/${id}`);
    dispatch(listLegalPerson())
  };

  useEffect(() => {
    setData(legalpersonAPI);
  }, [legalpersonAPI]);

  useEffect(() => {
    dispatch(listLegalPerson())
  }, []);

  return (
    <>
      <div className="m-4">
        <h3>Legal Persons</h3>
        <Button
          className="my-2"
          onClick={handleClickNewButton}
        >
          New Legal Person
        </Button>
        <CreateLegalPerson onclose={handleClickNewButton} visible={clickNew} />
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
              title: "Adress",
              dataIndex: "adress",
              key: "adress",
            },
            {
              title: "Identity Number",
              dataIndex: "identityNumber",
              key: "identityNumber",
            },
            {
              title: "Action",
              key: "action",
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

export default LegalPersonListLayout;
