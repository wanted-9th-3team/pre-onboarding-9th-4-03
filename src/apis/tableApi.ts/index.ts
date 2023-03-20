import axios from 'axios'
import { IData } from '../../Type'

const getTableInfo = async () => {
  const res = await fetch('/src/data/mock_data.json')
  const data = await res.json()
  // console.log(data) // 5초마다 갱신
  return data as IData[]
}

export default getTableInfo
