import { TradeItem } from '../Type'

export const sortByIDASC = (initTrade: TradeItem[] | undefined | null) => {
  if (initTrade)
    return initTrade.sort((now, other) => {
      if (now.id > other.id) {
        return 1
      }
      if (now.id < other.id) {
        return -1
      }
      return 0
    })
  return []
}

export const sortByIDDESC = (initTrade: TradeItem[] | undefined | null) => {
  if (initTrade)
    return initTrade.sort((now, other) => {
      if (now.id < other.id) {
        return 1
      }
      if (now.id > other.id) {
        return -1
      }
      return 0
    })
  return []
}

export const sortByTransactonTimeASC = (
  initTrade: TradeItem[] | undefined | null
) => {
  if (initTrade)
    return initTrade.sort((now, other) =>
      now.transaction_time.localeCompare(other.transaction_time)
    )
  return []
}

export const sortByTransactonTimeDESC = (
  initTrade: TradeItem[] | undefined | null
) => {
  if (initTrade)
    return initTrade.sort((now, other) =>
      other.transaction_time.localeCompare(now.transaction_time)
    )
  return []
}
