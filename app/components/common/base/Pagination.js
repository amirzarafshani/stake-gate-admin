import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination(props) {
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);

  useEffect(() => {}, []);

  return (
    props.totalPages > 1 && (
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={({ selected }) => props.onChange(selected + 1)}
        pageRangeDisplayed={5}
        pageCount={props.totalPages}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-item"
        activeClassName="active-item"
        previousClassName="page-item"
        nextClassName="page-item"
      />
    )
  );
}
