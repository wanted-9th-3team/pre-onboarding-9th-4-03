import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '..'

const selectTableListsReducer = (state: RootState) => state.table

export const selectTableLists = createSelector(
  [selectTableListsReducer],
  table => table.tableLists
)
export const selectSearchedTableLists = createSelector(
  [selectTableListsReducer],
  table => table.searchedTableLists
)
export const selectTotalTableLists = createSelector(
  [selectTableListsReducer],
  table => table.searchedTableLists.length
)
