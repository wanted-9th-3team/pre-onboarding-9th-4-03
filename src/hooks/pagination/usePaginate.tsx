import { useMemo, useState } from 'react'
import { ITable } from '../../Type'

// useUrlSearch hook부분은 빼야할 듯
const usePaginate = (products: ITable[]) => {
  const [currentPage, setCurrentPage] = useState(1)
  const perPageValue = 50

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
    setCurrentPage,
    currentPageProducts,
  }
}

export default usePaginate
