import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPagination = () => {
    const paginationItems = [];
    const maxVisiblePages = 5;

    if (currentPage > 1) {
      paginationItems.push(
        <button
          key="prev"
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      );
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - (maxVisiblePages - 1));
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      paginationItems.push(<span key="ellipsis">...</span>);
      paginationItems.push(
        <button
          key={totalPages}
          className="pagination-button"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages) {
      paginationItems.push(
        <button
          key="next"
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      );
    }

    return paginationItems;
  };

  return <div className="pagination">{renderPagination()}</div>;
};

export default Pagination;
