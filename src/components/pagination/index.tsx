import React from 'react'
import Pagination from 'react-js-pagination'
import './paging.css'

interface IPagination {
  currentPage: number
  count: number
  setPage: (currentPage: number) => void
  postPerPage: number
}

function Paginations({
  currentPage,
  count,
  setPage,
  postPerPage,
}: IPagination) {
  return (
    <span>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={postPerPage}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText="<"
        nextPageText=">"
        onChange={setPage}
      />
    </span>
  )
}

export default Paginations
