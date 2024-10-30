import React, { useState } from "react";
import "./DataTable.scss";
import PaginationContent from "@/pages/WarehouseList/pagination/PaginationContent";

export interface DataWarehouse {
  id: string;
  WarehouseName: string;
  address: string;
  type: string;
  price: string;
  partner: string;
  manager: string;
}

export const initialDataWarehouse: DataWarehouse[] = [
  {
    id: "1",
    WarehouseName: "Warehouse 1",
    address: "123, Tran Hung Dao",
    type: "Seft",
    price: "100.000 USD",
    partner: "CTY TNHH ABC",
    manager: "Nguyen Thi A"
  },
  {
    id: "2",
    WarehouseName: "Warehouse 2",
    address: "456, Le Loi",
    type: "Rent",
    price: "200.000 USD",
    partner: "CTY TNHH XYZ",
    manager: "Tran Van B"
  },
  {
    id: "3",
    WarehouseName: "Warehouse 3",
    address: "789, Phan Chau Trinh",
    type: "Seft",
    price: "150.000 USD",
    partner: "CTY TNHH LMN",
    manager: "Pham Thi C"
  },
  {
    id: "4",
    WarehouseName: "Warehouse 3",
    address: "789, Phan Chau Trinh",
    type: "Seft",
    price: "150.000 USD",
    partner: "CTY TNHH LMN",
    manager: "Pham Thi C"
  },
  {
    id: "5",
    WarehouseName: "Warehouse 3",
    address: "789, Phan Chau Trinh",
    type: "Seft",
    price: "150.000 USD",
    partner: "CTY TNHH LMN",
    manager: "Pham Thi C"
  },
  {
    id: "6",
    WarehouseName: "Warehouse 3",
    address: "789, Phan Chau Trinh",
    type: "Seft",
    price: "150.000 USD",
    partner: "CTY TNHH LMN",
    manager: "Pham Thi C"
  },
  {
    id: "7",
    WarehouseName: "Warehouse 3",
    address: "789, Phan Chau Trinh",
    type: "Seft",
    price: "150.000 USD",
    partner: "CTY TNHH LMN",
    manager: "Pham Thi C"
  },
  {
    id: "8",
    WarehouseName: "Warehouse 3",
    address: "789, Phan Chau Trinh",
    type: "Seft",
    price: "150.000 USD",
    partner: "CTY TNHH LMN",
    manager: "Pham Thi C"
  },
  {
    id: "9",
    WarehouseName: "Warehouse 3",
    address: "789, Phan Chau Trinh",
    type: "Seft",
    price: "150.000 USD",
    partner: "CTY TNHH LMN",
    manager: "Pham Thi C"
  },
  {
    id: "10",
    WarehouseName: "Warehouse 3",
    address: "789, Phan Chau Trinh",
    type: "Seft",
    price: "150.000 USD",
    partner: "CTY TNHH LMN",
    manager: "Pham Thi C"
  },
  {
    id: "11",
    WarehouseName: "Warehouse 3",
    address: "789, Phan Chau Trinh",
    type: "Seft",
    price: "150.000 USD",
    partner: "CTY TNHH LMN",
    manager: "Pham Thi C"
  },
  {
    id: "12",
    WarehouseName: "Warehouse 3",
    address: "789, Phan Chau Trinh",
    type: "Seft",
    price: "150.000 USD",
    partner: "CTY TNHH LMN",
    manager: "Pham Thi C"
  }
];

const DataTable = () => {

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
            <th>Warehouse Name</th>
            <th>Address</th>
            <th>Type</th>
            <th>Price</th>
            <th>Partner</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.WarehouseName}</td>
              <td>{item.address}</td>
              <td>{item.type}</td>
              <td>{item.price}</td>
              <td>{item.partner}</td>
              <td>{item.manager}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationContent items={items} />
    </div>
  );
};

export default DataTable;
