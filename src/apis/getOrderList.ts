import axios from 'axios'
import { TOrderList } from '../Type'

const getOrderList = async (): Promise<TOrderList[] | null> => {
  let res

  try {
    res = await axios.get('mock_data.json')
  } catch (error) {
    throw new Error('주문목록조회 오류')
  }

  if (res.status === 200) {
    return res.data
  }
  return null
}

export default getOrderList
