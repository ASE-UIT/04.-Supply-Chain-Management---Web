"use client";
import ButtonActionDelete from "@/components/layout/TableLayout/Buttons/ButtonActionDelete";
import ButtonActionEdit from "@/components/layout/TableLayout/Buttons/ButtonActionEdit";
import DataTable from "@/components/layout/TableLayout/DataTable/DataTable";
import { TableLayout } from "@/components/layout/TableLayout/TableLayout";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listDriver, removeDriver } from "@/redux/reducers/driverReducers";
import { CreateDriver } from "@/components/form/CreateDriver/CreateDriver";

export interface DataDriver {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  licenseType: string;
}

const DriverListLayout = () => {
  const dispatch = useDispatch();
  const driverAPI = useSelector((state: RootState) => state.driver.data);
  const [data, setData] = useState<DataDriver[]>([]);

  const [licenseType, setLicenseType] = useState("all");
  const [clickNew, setClickNew] = useState(false);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = (id: number) => {
    dispatch(removeDriver({ id }));
  };

  useEffect(() => {
    setData(driverAPI);
  }, [driverAPI]);

  useEffect(() => {
    dispatch(listDriver());
  }, []);

  return (
    <TableLayout title="Driver List" onClickNew={handleClickNewButton}>
      <>
        {clickNew && <CreateDriver onclose={handleClickNewButton} />}
        <DataTable
          dataAPI={data}
          headerRender={() => (
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>License Type</th>
              <th>Actions</th>
            </tr>
          )}
          rowRender={(item: any) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.licenseType}</td>
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

export default DriverListLayout;
