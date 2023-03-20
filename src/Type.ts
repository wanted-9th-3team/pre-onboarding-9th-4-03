export interface ITable {
  id: number
  status: boolean
  currency: string
  customer_id: number
  customer_name: string
  transaction_time: string
}

export type TSortingCategory =
  | keyof Pick<ITable, 'id' | 'transaction_time'>
  | 'reset'

export enum SORTCATEGORY {
  SORT_ID = 'id',
  SORT_TRANSACTION = 'transaction_time',
  SORT_RESET = 'reset',
}
