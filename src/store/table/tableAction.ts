import { ITable, TFilterCategory } from '../../Type'

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
