import { ITable } from '../Type'

export const tableFilerByStatus = (dataTable: ITable[], status: string) => {
  if (status === 'true') {
    return dataTable.filter(data => data.status === true)
  }
  if (status === 'false') {
    return dataTable.filter(data => data.status === false)
  }

  return dataTable
}

export const tableFilerByQuery = (dataTable: ITable[], searchTerm: string) => {
  if (searchTerm.length === 0) {
    return dataTable
  }
  return dataTable.filter(data =>
    data.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export const tableSortingHandler = (dataTable: ITable[], sortBy: string) => {
  if (sortBy === 'time') {
    return dataTable.sort(
      (a, b) =>
        new Date(b.transaction_time).valueOf() -
        new Date(a.transaction_time).valueOf()
    )
  }

  return sortBy === 'id_asc'
    ? dataTable.sort((a, b) => b.id - a.id)
    : dataTable.sort((a, b) => a.id - b.id)
}
