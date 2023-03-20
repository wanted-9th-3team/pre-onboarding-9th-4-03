import { useState } from 'react'
import { ITable } from '../../Type'

function useTableSorting(data: ITable[]) {
  const [sortedData, setSortedData] = useState<ITable[]>(data)

  const sortById = (inputData: ITable[]) => {
    return inputData.sort((a, b) => b.id - a.id)
  }

  const sortByTransactionTime = (inputData: ITable[]) => {
    return inputData.sort(
      (a, b) =>
        new Date(b.transaction_time).valueOf() -
        new Date(a.transaction_time).valueOf()
    )
  }

  const reset = () => {
    setSortedData(data)
  }

  return { sortedData, sortById, reset, sortByTransactionTime }
}

export default useTableSorting
