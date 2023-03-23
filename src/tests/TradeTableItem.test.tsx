import { render } from '@testing-library/react'
import { Table } from '@chakra-ui/react'
import TradeTableItem from '@components/TradeTableItem'
import { TradeItem } from '../Type'

describe('<TradeTableItem />', () => {
  const initialTradeItem: TradeItem = {
    id: 1,
    transaction_time: '2023-03-08 17:34:39',
    status: true,
    currency: '$59.78',
    customer_id: 3,
    customer_name: 'Test Name',
  }
  it('tradeItem이 제대로 렌더링되는지 확인', () => {
    const { getByText } = render(
      <Table>
        <tbody>
          <TradeTableItem nowTrade={initialTradeItem} />
        </tbody>
      </Table>
    )

    expect(getByText(initialTradeItem.id)).toBeInTheDocument()
    expect(getByText(initialTradeItem.currency)).toBeInTheDocument()
    expect(getByText(initialTradeItem.customer_id)).toBeInTheDocument()
    expect(getByText(initialTradeItem.customer_name)).toBeInTheDocument()
    expect(
      getByText(initialTradeItem.status ? 'completed' : 'processing')
    ).toBeInTheDocument()
    expect(getByText(initialTradeItem.transaction_time)).toBeInTheDocument()
  })
})
