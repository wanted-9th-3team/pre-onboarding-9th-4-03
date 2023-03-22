import React from 'react'
import Pagination from 'react-js-pagination'

interface IProp {
  count: number
  page: number
  setPage: () => void
  itemsCountPerPage: number
  pageRangeDisplayed: number
}
function Pagen({
  pageRangeDisplayed,
  itemsCountPerPage,
  count,
  page,
  setPage,
}: IProp) {
  return (
    <Pagination
      prevPageText="<"
      nextPageText=">"
      itemsCountPerPage={itemsCountPerPage}
      pageRangeDisplayed={pageRangeDisplayed}
      totalItemsCount={count}
      activePage={page}
      onChange={setPage}
    />
  )
}

export default Pagen
