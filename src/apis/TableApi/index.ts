import axios from 'axios'
import { TradeItem } from '../../Type'

const getTradeInfo = async () => {
  const res = await axios('mock_data.json')

  if (res.status === 200) {
    return res.data as TradeItem[]
  }
  return null
}

export default getTradeInfo
