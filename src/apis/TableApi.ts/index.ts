import axios from 'axios'

const getChartInfo = async () => {
  const res = await axios('mock_data.json')

  if (res.status === 200) {
    const { response } = res.data
    return response
  }
  return null
}

export default getChartInfo
