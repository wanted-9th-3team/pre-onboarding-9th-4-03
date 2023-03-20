import axios from 'axios'
import { ITable } from '../../Type'

const getDataTable = async () => {
  const response = await axios.get<ITable[]>('src/data/mock_data.json')

  if (response.status === 200) {
    return response.data
  }
  return null
}

export default getDataTable
