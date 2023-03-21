import { Tr, Td } from '@chakra-ui/react'
import { TradeItem } from '../../Type'

function TradeTableItem(props: { nowTrade: TradeItem }) {
  const { nowTrade } = props
  return (
    <Tr>
      <Td>{nowTrade.id}</Td>
      <Td>{nowTrade.transaction_time}</Td>
      <Td>{nowTrade.status ? '완료' : '진행중'}</Td>
      <Td>{nowTrade.customer_id}</Td>
      <Td>{nowTrade.customer_name}</Td>
      <Td isNumeric>{nowTrade.currency}</Td>
    </Tr>
  )
}

export default TradeTableItem
