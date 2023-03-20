import React, { useState, useEffect, useCallback } from 'react'
import { ITable } from '../../Type'

type CategoryConditionType =
  | keyof Pick<ITable, 'id' | 'transaction_time'>
  | 'reset'

interface TableContextType {
  sortedTable: ITable[]
  // onSortData: (category: CategoryConditionType) => void
  onSortData: (category: string) => void
  // onFilterData: (status: boolean) => void
  onSetTableData: (newData: ITable[]) => void
  setSortedTable: (data: ITable[]) => void
}

const TableContext = React.createContext<TableContextType>({
  sortedTable: [],
  // onSortData: (category: CategoryConditionType) => {},
  onSortData: (category: string) => {},
  setSortedTable: (data: ITable[]) => {},
  // onFilterData: (status: boolean) => {},
  onSetTableData: (newData: ITable[]) => {},
})

export function TableContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentTable, setCurrentTable] = useState<ITable[]>([])
  const [sortedTable, setSortedTable] = useState<ITable[]>([])

  const onSortData = (category: string) => {
    if (category === 'reset') {
      console.log(currentTable[0].id)

      setSortedTable(currentTable)
    } else if (category === 'id') {
      const sortedDataByCategory = currentTable.sort((a, b) => b.id - a.id)
      setSortedTable(sortedDataByCategory)
    } else {
      const sortedDataByCategory = currentTable.sort(
        (a, b) =>
          new Date(b.transaction_time).valueOf() -
          new Date(a.transaction_time).valueOf()
      )
      setSortedTable(sortedDataByCategory)
    }
  }

  const onSetTableData = (newData: ITable[]) => {
    setCurrentTable(newData)
    setSortedTable(newData)
  }
  // const signUpHandler = async (token: string, email: string) => {
  //   setCurrentUser({ email, token })
  //   setIsLoggedIn(true)
  // }

  // const logoutHandler = () => {
  //   StorageControl.storageRemover()
  //   setCurrentUser(null)
  //   setIsLoggedIn(false)
  // }

  return (
    <TableContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ sortedTable, onSortData, onSetTableData, setSortedTable }}
    >
      {children}
    </TableContext.Provider>
  )
}

export default TableContext
