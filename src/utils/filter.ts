import { TradeItem } from '../Type'

export const filterTradeByDate = (
  initTrade: TradeItem[] | undefined | null,
  today: string
) => {
  if (initTrade)
    return initTrade.filter(trade => trade.transaction_time.includes(today))
  return []
}

export const filterTradeByCustomerName = (
  initTrade: TradeItem[] | undefined | null,
  name: string
) => {
  if (initTrade)
    return initTrade.filter(trade =>
      trade.customer_name.toUpperCase().includes(name.toUpperCase())
    )
  return []
}

export const filterTradeByStatus = (
  initTrade: TradeItem[] | undefined | null,
  status: string
) => {
  if (initTrade) {
    switch (status) {
      case '완료':
        return initTrade.filter(trade => trade.status === true)
      case '진행중':
        return initTrade.filter(trade => trade.status === false)
      default:
        return initTrade
    }
  }
  return []
}
