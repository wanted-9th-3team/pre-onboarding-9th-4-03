import { TradeItem } from '../Type'

export const sortByIDASC = (initTrade: TradeItem[]) => {
  return initTrade.sort((now, other) => Number(now.id) - Number(other.id))
}

export const sortByIDDESC = (initTrade: TradeItem[]) => {
  return initTrade.sort((now, other) => Number(other.id) - Number(now.id))
}

export const sortByTransactonTimeASC = (initTrade: TradeItem[]) => {
  return initTrade.sort((now, other) =>
    now.transaction_time.localeCompare(other.transaction_time)
  )
}

export const sortByTransactonTimeDESC = (initTrade: TradeItem[]) => {
  return initTrade.sort((now, other) =>
    other.transaction_time.localeCompare(now.transaction_time)
  )
}
