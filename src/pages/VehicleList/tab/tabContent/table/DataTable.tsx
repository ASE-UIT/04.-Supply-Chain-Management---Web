import PaginationContent from "@/pages/WarehouseList/pagination/PaginationContent";
import { listVehicle } from "@/redux/reducers/vehicleReducers";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonActionDelete from "./ButtonActionDelete";
import ButtonActionEdit from "./ButtonActionEdit";
import "./DataTable.scss";

export interface DataVehicle {
  id: number,
  licensePlate: string,
  transportProviderID: number,
  driverID: number,
  capacity: number,
  type: string,
  fuelType: string,
  status: string,
}

const DataTable = () => {
  const dispatch = useDispatch();
  const vehicleAPI = useSelector((state: RootState) => state.vehicle.data);
  const [data, setData] = useState<DataVehicle[]>([]);
  const [editPage, setEditPage] = useState(false);

  //Pagination
  const [quantity, setQuantity] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<DataVehicle[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    dispatch(listVehicle())
  }, []);

  useEffect(() => {
    setData(vehicleAPI);
  }, [vehicleAPI]);

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
            <th>License Plate</th>
            <th>Transport Provider ID</th>
            <th>Driver ID</th>
            <th>Capacity</th>
            <th>Type</th>
            <th>Fuel Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.licensePlate}</td>
              <td>{item.transportProviderID}</td>
              <td>{item.driverID}</td>
              <td>{item.capacity}</td>
              <td>{item.fuelType}</td>
              <td>{item.status}</td>
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
