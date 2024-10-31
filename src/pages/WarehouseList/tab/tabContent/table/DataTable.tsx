import PaginationContent from "@/pages/WarehouseList/pagination/PaginationContent";
import { listWarehouse } from "@/redux/reducers/warehouseReducers";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonActionDelete from "./ButtonActionDelete";
import ButtonActionEdit from "./ButtonActionEdit";
import "./DataTable.scss";

export interface DataWarehouse {
  id: number,
  name: string,
  address: string,
  type: string,
  capacity: number,
  availability: boolean,
}

const DataTable = () => {
  const dispatch = useDispatch();
  const warehouseAPI = useSelector((state: RootState) => state.warehouse.data);
  const [data, setData] = useState<DataWarehouse[]>([]);
  const [editPage, setEditPage] = useState(false);

  //Pagination
  const [quantity, setQuantity] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<DataWarehouse[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    dispatch(listWarehouse())
  }, []);

  useEffect(() => {
    setData(warehouseAPI);
  }, [warehouseAPI]);

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
            <th>Address</th>
            <th>Capacity (m3)</th>
            <th>Type</th>
            <th>Avalability</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.capacity}</td>
              <td>{item.type}</td>
              <td>{item.availability ? 'Yes' : 'No'}</td>
              <td>
                <div className="d-flex flex-md-row flex-column action-button">
                  <ButtonActionEdit setEditPage={setEditPage} />
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
