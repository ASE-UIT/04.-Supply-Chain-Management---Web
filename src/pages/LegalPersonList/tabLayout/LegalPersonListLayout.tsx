"use client";
import { CreateLegalPerson } from "@/components/form/createLegalPerson/CreateLegalPerson";
import DataTable from "@/components/layout/TableLayout/DataTable/DataTable";
import { TableLayout } from "@/components/layout/TableLayout/TableLayout";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabButton from "../tabButton/TabButton";
import "./LegalPersonListLayout.scss";
import ButtonActionEdit from "@/components/layout/TableLayout/Buttons/ButtonActionEdit";
import ButtonActionDelete from "@/components/layout/TableLayout/Buttons/ButtonActionDelete";
import { listLegalPerson, removeLegalPerson } from "@/redux/reducers/legalpersonReducers";
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

  const handleDelete = (id: number) => {
    dispatch(removeLegalPerson({ id }));
  };

  useEffect(() => {
    setData(legalpersonAPI);
  }, [legalpersonAPI]);

  useEffect(() => {
    dispatch(listLegalPerson())
  }, []);

  return (
    <TableLayout
      title="Legal Person List"
      onClickNew={handleClickNewButton}
    >
      <>
        {clickNew && <CreateLegalPerson onclose={handleClickNewButton} />}
        <DataTable
          dataAPI={data}
          headerRender={() => (
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Adress</th>
              <th>Identity Number</th>
            </tr>
          )}
          rowRender={
            (item: any) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.adress}</td>
                <td>{item.identityNumber}</td>
                <td>
                  <div className="d-flex flex-md-row flex-column action-button">
                    <ButtonActionEdit onClickEdit={() => { }} />
                    <ButtonActionDelete onClickDelete={() => { handleDelete(item.id) }} />
                  </div>
                </td>
              </tr>
            )
          }
        />
      </>
    </TableLayout>
  );
};

export default LegalPersonListLayout;
