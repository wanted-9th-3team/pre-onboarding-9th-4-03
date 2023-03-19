export interface IOrderData {
  id: number
  transaction_time: string
  status: boolean
  customer_id: number
  customer_name: string
  currency: string
}

export interface IPaging {
  currentPage: number
  totalCount: number
  handlePageChange: any
}

export interface ISortData {
  orderDataBase: IOrderData[]
  setOrderDataBase: any
}
