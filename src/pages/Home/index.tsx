import { useQuery } from 'react-query'
import getTradeInfo from '../../apis/TableApi'
import { filterTradeByDate } from '../../utils/filter'
import { Container, Heading } from '@chakra-ui/react'
import TradeTable from '../../components/TradeTable'

const TODAY = '2023-03-08'
function Home() {
  const { data } = useQuery({
    queryKey: ['getTrade'],
    queryFn: getTradeInfo,
    refetchInterval: 5000,
  })

  return (
    <Container minW='1000px'>
      <header>
        <Heading as='h1' size='lg' style={{padding:'20px', textAlign:'center'}}>Order Management</Heading>
      </header>
      <TradeTable trade={filterTradeByDate(data, TODAY)} />
    </Container>
  )
}

export default Home
