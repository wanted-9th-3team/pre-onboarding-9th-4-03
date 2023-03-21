import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ITable } from '../../Type'
import {
  tableFilerByStatus,
  tableFilerByQuery,
  tableSortingHandler,
} from '../../utils/util'

function useTableSorting(data: ITable[]) {
  const [searchParams] = useSearchParams()
  const [sortedData, setSortedData] = useState<ITable[]>([])

  const sortAndFilterTableData = useCallback(
    (changedParam: { [key: string]: string }) => {
      let inputData = [...data]
      const currentSearchParam = {
        ...Object.fromEntries(searchParams.entries()),
        ...changedParam,
      }

      if (currentSearchParam.status) {
        inputData = tableFilerByStatus(inputData, currentSearchParam.status)
      }
      if (currentSearchParam.query) {
        inputData = tableFilerByQuery(inputData, currentSearchParam.query)
      }
      if (currentSearchParam.sort) {
        inputData = tableSortingHandler(inputData, currentSearchParam.sort)
      }
      setSortedData(inputData)
    },
    [data, searchParams]
  )

  useEffect(() => {
    setSortedData(data)
  }, [data])

  return {
    sortedData,
    sortAndFilterTableData,
  }
}

export default useTableSorting
