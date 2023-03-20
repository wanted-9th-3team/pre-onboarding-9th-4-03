import axios from 'axios'
import { IData, ITableInfo } from '../../Type'

const getTableInfo = async () => {
  const res = await fetch('/src/data/mock_data.json')
  const data = await res.json()
  // console.log(data)
  return data as ITableInfo[]
}

export default getTableInfo
