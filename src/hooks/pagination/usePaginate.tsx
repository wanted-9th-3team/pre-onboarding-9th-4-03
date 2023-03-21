import { useMemo, useState } from 'react'
import { ITable } from '../../Type'

// useUrlSearch hook부분은 빼야할 듯
const usePaginate = (products: ITable[]) => {
  const [currentPage, setCurrentPage] = useState(1)
  const perPageValue = 50

  // 현재 버튼 값보다 변한 데이터의 마지막 버튼 값이 작을 경우 버튼 값 변경울 위한 함수
  const perPageValueHandler = (newTableData: ITable[]) => {
    const lastPageNumber = Math.ceil(newTableData.length / perPageValue)
    if (lastPageNumber < currentPage) {
      return lastPageNumber
    }
    return null
  }

  const currentPageProducts = useMemo(
    () =>
      products?.slice(
        currentPage * perPageValue - perPageValue,
        currentPage * perPageValue
      ),
    [currentPage, perPageValue, products]
  )

  return {
    currentPage,
    perPageValue,
    currentPageProducts,
    setCurrentPage,
    perPageValueHandler,
  }
}

export default usePaginate
