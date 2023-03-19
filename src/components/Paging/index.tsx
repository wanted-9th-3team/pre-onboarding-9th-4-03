// eslint-disable-next-line import/no-extraneous-dependencies
import Pagination from 'react-js-pagination'
import { IPaging } from '../../Type'
import './Paging.css'

function Paging({ currentPage, totalCount, handlePageChange }: IPaging) {
  return (
    <div>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={50}
        totalItemsCount={totalCount}
        pageRangeDisplayed={10}
        prevPageText="<"
        nextPageText=">"
        onChange={handlePageChange}
      />
    </div>
  )
}

export default Paging
