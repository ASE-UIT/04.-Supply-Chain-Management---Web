import React, { useEffect, useState } from "react";
import "./DataTable.scss";
import { listProduct } from "@/redux/reducers/productReducers";
import { RootState } from "@/redux/store";
import { type } from "@testing-library/user-event/dist/type";
import { useDispatch, useSelector } from "react-redux";
import ButtonActionDelete from "./ButtonActionDelete";
import ButtonActionEdit from "./ButtonActionEdit";
import PaginationContent from "@/components/layout/TableLayout/DataTable/PaginationContent";

export interface DataProduct {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  status: string;
  type: string;
  size: number;
  weight: number;
}

interface DataTableProps {
  onRowClick: (item: DataProduct) => void;
  onClickEdit: (item: DataProduct) => void;
}

const DataTable: React.FC<DataTableProps> = ({ onRowClick, onClickEdit }) => {
  const dispatch = useDispatch();
  const productAPI = useSelector((state: RootState) => state.product.data);
  const [data, setData] = useState<DataProduct[]>([]);

  //Pagination
  const [quantity, setQuantity] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<DataProduct[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    dispatch(listProduct())
  }, []);

  useEffect(() => {
    setData(productAPI);
  }, [productAPI]);

  useEffect(() => {
    if (data.length) {
      const totalPages = Math.ceil(data.length / quantity);
      const startIndex = (currentPage - 1) * quantity;
      const endIndex = startIndex + quantity;
      const currentData = data.slice(startIndex, endIndex);
      setCurrentData(currentData);
      setTotalPages(totalPages);
    }
  }, [
    data,
    quantity,
    currentPage
  ]);

  return (
    <div className="table-div">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Type</th>
            <th>Size (cm3)</th>
            <th>Weight (g)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr data-t={item.id} key={item.id} onClick={(event) => {
              // Ignore click event when target is not this
              if (event.target !== event.currentTarget) {
                return;
              }
              onRowClick(item)
            }}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
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
                    idItemDelete={item.id}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationContent items={{
        currentPage,
        setCurrentPage,
        totalPages,
        setQuantity,
        quantity
      }} />
    </div>
  );
};

export default DataTable;
