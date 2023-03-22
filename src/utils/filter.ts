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
  initTrade: TradeItem[],
  name: string
) => {
  return initTrade.filter(trade =>
    trade.customer_name.toUpperCase().includes(name.toUpperCase())
  )
}

export const filterTradeByStatus = (initTrade: TradeItem[], status: string) => {
  switch (status) {
    case 'completed':
      return initTrade.filter(trade => trade.status === true)
    case 'processing':
      return initTrade.filter(trade => trade.status === false)
    default:
      return initTrade
  }
}
