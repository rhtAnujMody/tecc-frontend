import {
  Pagination,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ITEMSPERPAGE } from "@/lib/constants";
import { TPagination } from "@/types";

export default function TablePagination({
  currentPage,
  setCurrentPage,
  data,
}: TPagination) {
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil((data as any[]).length / ITEMSPERPAGE);

  const renderPaginationItems = () => {
    const pages = [];
    const ellipsis = <PaginationEllipsis />;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationLink
            key={i}
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
            style={{ color: "#475467" }}
            className="text-sm font-medium cursor-pointer"
          >
            {i}
          </PaginationLink>
        );
      }
    } else {
      pages.push(
        <PaginationLink
          key={1}
          onClick={() => handlePageChange(1)}
          isActive={currentPage === 1}
          style={{ color: "#475467" }}
          className="text-sm font-medium cursor-pointer"
        >
          1
        </PaginationLink>
      );

      if (currentPage > 3) {
        pages.push(ellipsis);
      }

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PaginationLink
            key={i}
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
            style={{ color: "#475467" }}
            className="text-sm font-medium cursor-pointer"
          >
            {i}
          </PaginationLink>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(ellipsis);
      }

      pages.push(
        <PaginationLink
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          isActive={currentPage === totalPages}
          style={{ color: "#475467" }}
          className="text-sm font-medium cursor-pointer"
        >
          {totalPages}
        </PaginationLink>
      );
    }

    return pages;
  };
  return (
    <Pagination className="flex justify-between items-center px-5 mt-5">
      <PaginationPrevious
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        className="border cursor-pointer"
      />
      <div className="flex">{renderPaginationItems()}</div>
      <PaginationNext
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        className="border cursor-pointer"
      />
    </Pagination>
  );
}
