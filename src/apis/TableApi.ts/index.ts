import axios from 'axios'

const getTableInfo = async () => {
  const res = await axios('src/data/mock_data.json')

  if (res.status === 200) {
    const response = res.data
    return response
  }
  return null
}

export default getTableInfo
