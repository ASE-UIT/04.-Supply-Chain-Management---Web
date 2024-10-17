import React, { useState } from "react";
import "./DataTable.scss";
import { Icon } from "@iconify/react";

import PaginationContent from "@/components/partner-list/pagination/PaginationContent";
import ButtonActionDelete from "./ButtonActionDelete";
import ButtonActionEdit from "./ButtonActionEdit";
import { formatCurrencyVND } from "@/utils/helper";

export interface DataProduct {
  id: string;
  name: string;
  price: number;
  nameSupplier: string;
  type: string;
  size: string;
  weight: number;
}

interface DataTableProps {
  onRowClick: (item: DataProduct) => void;
  onClickEdit: (item: DataProduct) => void;
}

export const initialDataProduct: DataProduct[] = [
  {
    id: "1",
    name: "Product A",
    price: 100000,
    nameSupplier: "Supplier X",
    type: "Electronics",
    size: "Medium",
    weight: 1,
  },
  {
    id: "2",
    name: "Product B",
    price: 150000,
    nameSupplier: "Supplier Y",
    type: "Clothing",
    size: "Large",
    weight: 0.5,
  },
  {
    id: "3",
    name: "Product C",
    price: 200000,
    nameSupplier: "Supplier Z",
    type: "Accessories",
    size: "Small",
    weight: 0.25,
  },
  {
    id: "4",
    name: "Product D",
    price: 120000,
    nameSupplier: "Supplier A",
    type: "Gadgets",
    size: "Large",
    weight: 5,
  },
  {
    id: "5",
    name: "Product E",
    price: 180000,
    nameSupplier: "Supplier B",
    type: "Furniture",
    size: "Extra Large",
    weight: 10,
  },
  {
    id: "6",
    name: "Product F",
    price: 90000,
    nameSupplier: "Supplier C",
    type: "Toys",
    size: "Small",
    weight: 0.5,
  },
  {
    id: "7",
    name: "Product G",
    price: 1100000,
    nameSupplier: "Supplier D",
    type: "Books",
    size: "Medium",
    weight: 1.5,
  },
  {
    id: "8",
    name: "Product H",
    price: 300000,
    nameSupplier: "Supplier E",
    type: "Electronics",
    size: "Medium",
    weight: 3,
  },
];

const DataTable: React.FC<DataTableProps> = ({ onRowClick, onClickEdit }) => {
  const [data, setData] = useState<DataProduct[]>(initialDataProduct);

  const [quantity, setQuantity] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(initialDataProduct.length / quantity);
  const startIndex = (currentPage - 1) * quantity;
  const endIndex = startIndex + quantity;
  const currentData = data.slice(startIndex, endIndex);
  const items = {
    currentPage,
    setCurrentPage,
    totalPages,
    setQuantity,
    quantity,
  };

  return (
    <div className="table-div">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (đ)</th>
            <th>Supplier</th>
            <th>Type</th>
            <th>Size (cm)</th>
            <th>Weight (kg)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id} onClick={() => onRowClick(item)}>
              <td>{item.name}</td>
              <td>{formatCurrencyVND(item.price)}</td>
              <td>{item.nameSupplier}</td>
              <td>{item.type}</td>
              <td>{item.size}</td>
              <td>{item.weight}</td>
              <td>
                <div className="d-flex flex-md-row flex-column action-button">
                  <ButtonActionEdit
                    setEditPage={() => {
                      onClickEdit(item);
                    }}
                  />
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
