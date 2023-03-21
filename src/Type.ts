export interface ITable {
  id: number
  status: boolean
  currency: string
  customer_id: number
  customer_name: string
  transaction_time: string
}

export type TSortingCategory = keyof Pick<ITable, 'id' | 'transaction_time'>

export type TFilterCategory = {
  status: boolean | string
  searchTerm: string
}

export enum SORTCATEGORY {
  SORT_ID_ASC = 'id_asc',
  SORT_ID_DESC = 'id_desc',
  SORT_TRANSACTION = 'transaction_time',
}

export interface ISearchParam {
  status: 'true' | 'false' | 'all'
  sort?: 'id' | 'transaction_time'
  query: string
}
