import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PaginationContainerHF = () => {
  const { pageCount, pageSize } = useLoaderData();
  // const { pageCount, page } = meta.pagination;
  const [currentPage, setCurrentPage] = useState(1);
  // const page = currentPage;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
    setCurrentPage(pageNumber);
  };

  // console.log("page", page);

  // console.log("search", search);
  useEffect(() => {
    const pageNum = parseInt(search.split("=")[1]) || 1;
    // console.log("pageNum", pageNum);
    setCurrentPage(pageNum);
  }, []);

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = currentPage - 1;

            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === currentPage ? "bg-base-300 border-base-300 " : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = currentPage + 1;

            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default PaginationContainerHF;
