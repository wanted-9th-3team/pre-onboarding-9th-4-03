import { Tr, Td } from '@chakra-ui/react'
import { TradeItem } from '../../Type'

interface ITradeTableItemProps {
  nowTrade: TradeItem
}

function TradeTableItem({ nowTrade }: ITradeTableItemProps) {
  return (
    <Tr data-testid="trade-data-list">
      <Td data-testid="trade-data-list-id">{nowTrade.id}</Td>
      <Td data-testid="trade-data-list-time">{nowTrade.transaction_time}</Td>
      <Td data-testid="trade-data-list-status">
        {nowTrade.status ? 'completed' : 'processing'}
      </Td>
      <Td>{nowTrade.customer_id}</Td>
      <Td data-testid="trade-data-list-name">{nowTrade.customer_name}</Td>
      <Td isNumeric>{nowTrade.currency}</Td>
    </Tr>
  )
}

export default TradeTableItem
