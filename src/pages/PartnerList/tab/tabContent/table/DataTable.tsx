import PaginationContent from "@/pages/PartnerList/pagination/PaginationContent";
import { useState } from "react";
import ButtonActionDelete from "./ButtonActionDelete";
import ButtonActionEdit from "./ButtonActionEdit";
import "./DataTable.scss";

export interface DataWarehouse {
  id: string;
  name: string;
  owner: string;
  location: string;
  type: string;
}

export const initialDataWarehouse: DataWarehouse[] = [
  {
    id: "1",
    name: "Kho 1",
    owner: "Nguyen Van A",
    location: "Thu Duc City, HCM City",
    type: "150.000 USD"
  },
  {
    id: "2",
    name: "Kho 2",
    owner: "Nguyen Van A",
    location: "Ward 6, HCM City",
    type: "150.000 USD"
  },
  {
    id: "3",
    name: "Kho 3",
    owner: "Nguyen Van B",
    location: "Di An City, Binh Duong Province",
    type: "150.000 USD"
  },
  {
    id: "4",
    name: "Xe CD",
    owner: "La Van Mot",
    location: "Ward 1, HCM City",
    type: "150.000 USD"
  },
  {
    id: "5",
    name: "Nha xe X",
    owner: "Le Minh Ba",
    location: "Ward 3, HCM City",
    type: "150.000 USD"
  },
  {
    id: "6",
    name: "Van tai S",
    owner: "Ly Thi Bay",
    location: "Ward 7, HCM City",
    type: "150.000 USD"
  },
  {
    id: "7",
    name: "Kho 1",
    owner: "Nguyen Van A",
    location: "Thu Duc City, HCM City",
    type: "150.000 USD"
  },
  {
    id: "8",
    name: "Kho 2",
    owner: "Nguyen Van A",
    location: "Ward 6, HCM City",
    type: "150.000 USD"
  },
  {
    id: "9",
    name: "Kho 3",
    owner: "Nguyen Van B",
    location: "Di An City, Binh Duong Province",
    type: "150.000 USD"
  },
  {
    id: "10",
    name: "Xe CD",
    owner: "La Van Mot",
    location: "Ward 1, HCM City",
    type: "150.000 USD"
  },
  {
    id: "11",
    name: "Kho 3",
    owner: "Nguyen Van B",
    location: "Di An City, Binh Duong Province",
    type: "150.000 USD"
  },
  {
    id: "12",
    name: "Xe CD",
    owner: "La Van Mot",
    location: "Ward 1, HCM City",
    type: "150.000 USD"
  }
];

const DataTable = () => {
  const [data, setData] = useState<DataWarehouse[]>(initialDataWarehouse);
  const [editPage, setEditPage] = useState(false);

  //Pagination
  const [quantity, setQuantity] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(initialDataWarehouse.length / quantity);
  const startIndex = (currentPage - 1) * quantity;
  const endIndex = startIndex + quantity;
  const currentData = initialDataWarehouse.slice(startIndex, endIndex);
  const items = {
    currentPage,
    setCurrentPage,
    totalPages,
    setQuantity,
    quantity
  };

  return (
    <div className="table-div">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Location</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.owner}</td>
              <td>{item.location}</td>
              <td>{item.type}</td>
              <td>
                <div className="d-flex flex-md-row flex-column action-button">
                  <ButtonActionEdit setEditPage={setEditPage} />
                  <ButtonActionDelete
                    setData={setData}
                    data={data}
                    idItemDelete={item.id}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationContent items={items} />
    </div>
  );
};

export default DataTable;
