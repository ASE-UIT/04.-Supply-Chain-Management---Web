import { useEffect, useState } from "react";
import "./DataTable.scss";
import PaginationContent from "./PaginationContent";

const DataTable = ({
  dataAPI,
  headerRender,
  rowRender,
}: {
  dataAPI: any[];
  headerRender: () => JSX.Element;
  rowRender: (item: any) => JSX.Element;
}) => {
  const [data, setData] = useState<any[]>([]);

  //Pagination
  const [quantity, setQuantity] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setData(dataAPI);
  }, [dataAPI]);

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
          {headerRender()}
        </thead>
        <tbody>
          {currentData.map((item) => (
            rowRender(item)
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
