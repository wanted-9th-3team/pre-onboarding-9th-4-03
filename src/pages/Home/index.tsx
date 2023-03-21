import { useQuery } from 'react-query'
import getTradeInfo from '../../apis/TableApi'
import { filterTradeByDate } from '../../utils/filter'
import TradeTable from '../../components/TradeTable'

const TODAY = '2023-03-08'
function Home() {
  const { data } = useQuery({
    queryKey: ['getTrade'],
    queryFn: getTradeInfo,
    refetchInterval: 5000,
  })

  return (
    <div>
      <TradeTable trade={filterTradeByDate(data, TODAY)} />
    </div>
  )
}

export default Home
