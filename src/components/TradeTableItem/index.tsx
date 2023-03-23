import { Tr, Td } from '@chakra-ui/react'
import { TradeItem } from '../../Type'

interface ITradeTableItemProps {
  nowTrade: TradeItem
}

function TradeTableItem({ nowTrade }: ITradeTableItemProps) {
  return (
    <Tr data-testid="trade-table-item">
      <Td>{nowTrade.id}</Td>
      <Td>{nowTrade.transaction_time}</Td>
      <Td>{nowTrade.status ? 'completed' : 'processing'}</Td>
      <Td>{nowTrade.customer_id}</Td>
      <Td>{nowTrade.customer_name}</Td>
      <Td isNumeric>{nowTrade.currency}</Td>
    </Tr>
  )
}

export default TradeTableItem
