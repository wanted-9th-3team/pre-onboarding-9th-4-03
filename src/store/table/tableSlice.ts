import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ITable, TSortingCategory } from '../../Type'

interface TableState {
  total: number
  tableLists: ITable[]
  searchedTableLists: ITable[]
}

export const initialState: TableState = {
  total: 0,
  tableLists: [],
  searchedTableLists: [],
}

export const TableSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setTableLists: (state, action: PayloadAction<ITable[]>) => {
      state.total = action.payload.length
      state.tableLists = action.payload
      state.searchedTableLists = action.payload
    },
    sortTableLists: (state, action: PayloadAction<TSortingCategory>) => {
      const category = action.payload

      if (category === 'reset') {
        state.searchedTableLists = state.tableLists
        return
      }

      let newSortedTableLists: ITable[] = []
      const originTable = [...state.searchedTableLists]

      if (category === 'id') {
        newSortedTableLists = originTable.sort((a, b) => b.id - a.id)
      } else {
        newSortedTableLists = originTable.sort(
          (a, b) =>
            new Date(b.transaction_time).valueOf() -
            new Date(a.transaction_time).valueOf()
        )
      }

      state.searchedTableLists = newSortedTableLists
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
      state.searchedTableLists = state.tableLists.filter(list =>
        list.customer_name.toLocaleLowerCase().includes(searchTerm)
      )
    },
  },
})

export const {
  setTableLists,
  sortTableLists,
  filterByStatusTable,
  searchByName,
} = TableSlice.actions
export default TableSlice.reducer
