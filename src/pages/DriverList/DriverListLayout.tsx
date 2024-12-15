"use client";
import { CreateDriver } from "@/components/form/createDriver/CreateDriver";
import ButtonActionDelete from "@/components/layout/TableLayout/Buttons/ButtonActionDelete";
import ButtonActionEdit from "@/components/layout/TableLayout/Buttons/ButtonActionEdit";
import DataTable from "@/components/layout/TableLayout/DataTable/DataTable";
import { TableLayout } from "@/components/layout/TableLayout/TableLayout";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { removeDriver } from "@/redux/reducers/driverReducers";
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

  const handleDelete = (id: number) => {
    dispatch(removeDriver({ id }));
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
    <TableLayout title="Driver List" onClickNew={handleClickNewButton}>
      <>
        {clickNew && <CreateDriver onclose={handleClickNewButton} onsubmit={handleFinishCreate} />}
        <DataTable
          dataAPI={data}
          headerRender={() => (
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>License Number</th>
              <th>License Type</th>
              <th>Actions</th>
            </tr>
          )}
          rowRender={(item: DataDriver) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.licenseNumber}</td>
              <td>{item.licenseType}</td>
              <td>
                <div className="d-flex flex-md-row flex-column action-button">
                  <ButtonActionEdit onClickEdit={() => { }} />
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
