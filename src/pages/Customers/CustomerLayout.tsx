"use client";
import DataTable from "@/components/layout/TableLayout/DataTable/DataTable";
import { TableLayout } from "@/components/layout/TableLayout/TableLayout";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CustomerLayout.scss";
import ButtonActionEdit from "@/components/layout/TableLayout/Buttons/ButtonActionEdit";
import ButtonActionDelete from "@/components/layout/TableLayout/Buttons/ButtonActionDelete";
import { listCustomer, removeCustomer } from "@/redux/reducers/customerReducers";
import { CreateCustomer } from "@/components/form/createCustomer/CreateCustomer";

export interface DataCustomer {
    id: number;
    name: string;
    presenter: string;
    phoneNumber: string;
    email: string;
    address: string;
    presenterPhoneNumber: string;
    presenterEmail: string;
    presenterAddress: string;
    taxCode: string;
    type: string;
}

const Customer = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<DataCustomer[]>([]);

  const [clickNew, setClickNew] = useState(false);

  const handleClickNewButton = () => {
    setClickNew(!clickNew);
  };

  const handleDelete = (id: number) => {
    dispatch(removeCustomer({ id }));
  };

  useEffect(() => {
    dispatch(listCustomer());
  }, []);

  return (
    <TableLayout
      title="Customers"
    >
      <>
        <DataTable
          dataAPI={data}
          headerRender={() => (
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Presenter</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Adress</th>
                <th>Presenter Phone Number</th>
                <th>Presenter Email</th>
                <th>Presenter Adress</th>
                <th>Tax Code</th>
                <th>Type</th>
                <th>Actions</th>
            </tr>
          )}
          rowRender={(item: any) => (
            <tr>
                <td>C0001</td>
                <td>CTY TNHH</td>
                <td>Duy Nguyen</td>
                <td>0365497514</td>
                <td>duy@gmail.com</td>
                <td>TP Ho Chi Minh</td>
                <td>0365497514</td>
                <td>duy@gmail.com</td>
                <td>TP Ho Chi Minh</td>
                <td>9999999</td>
                <td>Current</td>
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

export default Customer;
