import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ITable, TFilterCategory, TSortingCategory } from '../../Type'

interface TableState {
  total: number
  tableLists: ITable[]
  sortAndFilteredTableLists: ITable[]
  searchedTableLists: ITable[]
}

export const initialState: TableState = {
  total: 0,
  tableLists: [],
  sortAndFilteredTableLists: [],
  searchedTableLists: [],
}

const tableSortingHandler = (
  dataTable: ITable[],
  sort: 'id' | 'transaction_time'
) => {
  if (sort === 'id') {
    return dataTable.sort((a, b) => b.id - a.id)
  }
  return dataTable.sort(
    (a, b) =>
      new Date(b.transaction_time).valueOf() -
      new Date(a.transaction_time).valueOf()
  )
}

const tableFilertingHandler = (
  dataTable: ITable[],
  filter: TFilterCategory
) => {
  const { status, searchTerm } = filter
  searchTerm.toLowerCase()
  if (typeof status === 'boolean' && typeof searchTerm === 'string') {
    const statusFilteredData = dataTable.filter(data => data.status === status)
    return searchTerm
      ? statusFilteredData.filter(data =>
          data.customer_name.toLowerCase().includes(searchTerm)
        )
      : statusFilteredData
  }
  if (typeof status === 'boolean') {
    return dataTable.filter(data => data.status === status)
  }

  return dataTable.filter(data =>
    data.customer_name.toLowerCase().includes(searchTerm)
  )
}

export const TableSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setTableLists: (state, action: PayloadAction<ITable[]>) => {
      state.total = action.payload.length
      state.tableLists = action.payload
      state.searchedTableLists = action.payload
      state.sortAndFilteredTableLists = action.payload
    },
    sortAndFilterTableLists: (
      state,
      action: PayloadAction<{
        sort?: TSortingCategory
        filter: TFilterCategory
      }>
    ) => {
      const { sort, filter } = action.payload

      const originTable = [...state.tableLists]
      const sortedAndFilteredList = tableFilertingHandler(originTable, filter)

      if (sort) {
        // if (sort === 'reset') {
        //   state.searchedTableLists = state.tableLists
        //   state.sortAndFilteredTableLists = state.tableLists
        //   return
        // }
        const rawData = sortedAndFilteredList
        const newSortedTableLists = tableSortingHandler(rawData, sort)

        state.sortAndFilteredTableLists = newSortedTableLists
      }

      state.sortAndFilteredTableLists = sortedAndFilteredList
    },
    filterByStatusTable: (state, action: PayloadAction<boolean>) => {
      const status = action.payload

      let newSortedTableLists: ITable[] = []
      const originTable = [...state.tableLists]

      if (status) {
        newSortedTableLists = originTable.filter(
          tableList => tableList.status === true
        )
      } else {
        newSortedTableLists = originTable.filter(
          tableList => tableList.status === false
        )
      }
      state.searchedTableLists = newSortedTableLists
    },
    searchByName: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.trim().toLocaleLowerCase()
      if (searchTerm.length === 0) {
        state.searchedTableLists = state.tableLists
      }
      state.searchedTableLists = state.searchedTableLists.filter(list =>
        list.customer_name.toLocaleLowerCase().includes(searchTerm)
      )
    },
  },
})

export const {
  setTableLists,
  sortAndFilterTableLists,
  filterByStatusTable,
  searchByName,
} = TableSlice.actions
export default TableSlice.reducer
