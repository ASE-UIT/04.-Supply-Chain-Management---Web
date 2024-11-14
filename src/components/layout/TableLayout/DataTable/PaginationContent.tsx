import React from "react";
import "./PaginationContent.scss";
import { Pagination } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setQuantity: (quantity: number) => void;
  quantity: number;
}

interface Props {
  items: PaginationProps;
}

const PaginationContent: React.FC<Props> = ({ items }) => {
  const { currentPage, totalPages, setQuantity, quantity, setCurrentPage } =
    items;

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const num = parseInt(event.target.value, 10);
    setQuantity(num);
    setCurrentPage(1); // Reset trang về 1 khi thay đổi số lượng
  };

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    let displayedPages: (number | string)[] = [];
    let edgePage = 3;

    if (totalPages <= 5) {
      displayedPages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage > 3) {
        const distancePage = totalPages - currentPage;
        if (distancePage >= 3) {
          if (currentPage > edgePage) {
            displayedPages = [
              currentPage,
              currentPage + 1,
              currentPage + 2,
              "...",
              totalPages
            ];
            edgePage += 3;
          }
        } else {
          displayedPages = [
            "...",
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
          ];
        }
      } else {
        displayedPages = [1, 2, 3, "...", totalPages];
      }
    }

    return (
      <>
        {displayedPages.map((page, index) => (
          <Pagination.Item
            key={index}
            active={page === currentPage}
            onClick={() => {
              if (page !== "...") onPageChange(page as number);
            }}
          >
            {page}
          </Pagination.Item>
        ))}
      </>
    );
  };

  return (
    <div className="pagination-layout">
      <div className="my-pagination-div">
        <div className="view-div">
          <p className="view-text">View</p>
          <div className="select-quantity">
            <select onChange={handleSelect} value={quantity}>
              {[5, 10, 20, 50, 100].map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <p className="view-text">item per page</p>
        </div>
        <div className="pagination-div">
          <Pagination>
            <Pagination.Prev
              className={`prev page-item ${currentPage === 1 ? "disabled" : ""
                }`}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </Pagination.Prev>

            {renderPaginationItems()}

            <Pagination.Next
              className={`next page-item ${currentPage === totalPages ? "disabled" : ""
                }`}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {">"}
            </Pagination.Next>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default PaginationContent;