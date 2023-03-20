export interface Ttable {
  id: string
  value: number
}

export interface IData {
  id: number
  transaction_time: string
  status: boolean
  customer_id: number
  customer_name: string
  currency: string
}

export interface ITableInfo {
  [key: number]: IData
}
