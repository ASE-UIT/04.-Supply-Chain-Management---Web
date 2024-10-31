import PaginationContent from "@/pages/PartnerList/pagination/PaginationContent";
import { useEffect, useState } from "react";
import ButtonActionDelete from "./ButtonActionDelete";
import ButtonActionEdit from "./ButtonActionEdit";
import "./DataTable.scss";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { listPartner } from "@/redux/reducers/partnerReducers";

export interface DataPartner {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  type: string;
}


const DataTable = ({ type }: { type: string }) => {
  const dispatch = useDispatch();
  const partnerAPI = useSelector((state: RootState) => state.partner.data);
  const [data, setData] = useState<DataPartner[]>([]);
  const [editPage, setEditPage] = useState(false);

  //Pagination
  const [quantity, setQuantity] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<DataPartner[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    dispatch(listPartner())
  }, []);

  useEffect(() => {
    setData(partnerAPI);
  }, [partnerAPI]);

  useEffect(() => {
    const newData = partnerAPI.filter((item) => item.type === type || type === 'all');
    setData(newData);
  }, [type]);

  useEffect(() => {
    console.log('data thay doi', data);
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
            <th>Email</th>
            <th>Phone</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id.toString()}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.type}</td>
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
