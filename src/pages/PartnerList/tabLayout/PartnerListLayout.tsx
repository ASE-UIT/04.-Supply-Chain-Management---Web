"use client";
import { CreatePartner } from "@/components/form/CreatePartner/CreatePartner";
import DataTable from "@/components/layout/TableLayout/DataTable/DataTable";
import { TableLayout } from "@/components/layout/TableLayout/TableLayout";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabButton from "../tabButton/TabButton";
import "./PartnerListLayout.scss";
import ButtonActionEdit from "@/components/layout/TableLayout/Buttons/ButtonActionEdit";
import ButtonActionDelete from "@/components/layout/TableLayout/Buttons/ButtonActionDelete";
import { removePartner } from "@/redux/reducers/partnerReducers";
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

  const [type, setType] = useState("all");
  const [clickNew, setClickNew] = useState(false);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = (id: number) => {
    dispatch(removePartner({ id }));
  };

  useEffect(() => {
    const newData = partnerAPI.filter((item) => item.type === type || type === 'all');
    setData(newData);
  }, [type]);


  return (
    <TableLayout
      title="Partner List"
      tabButton={<TabButton isClick={type} setClick={setType} />}
      onClickNew={handleClickNewButton}
    >
      <>
        {clickNew && <CreatePartner onclose={handleClickNewButton} />}
        <DataTable
          dataAPI={data}
          headerRender={() => (
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          )}
          rowRender={
            (item: any) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.type}</td>
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

export default PartnerListLayout;
