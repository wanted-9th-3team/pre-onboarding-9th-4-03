import { fireEvent, render, screen } from '@testing-library/react'
import { Table } from '@chakra-ui/react'
import TradeTableItem from '@components/TradeTableItem'
import TradeTable from '@components/TradeTable'
import { BrowserRouter } from 'react-router-dom'
import mock_data from '../data/mock_data.json'
import { TradeItem } from '../Type'

function reset() {
  return render(
    <BrowserRouter>
      <TradeTable trade={mock_data} />
    </BrowserRouter>
  )
}

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

describe('<PaginationBar />', () => {
  it('tradeData가 mock_data인 경우, 페이지네이션 버튼이 10개여야 한다.', () => {
    reset()
    const paginationBar = screen.getByTestId('pagination-bar').firstChild

    expect(paginationBar?.childNodes.length).toBe(10)
  })

  it('tradeData가 mock_data인 경우, 페이지네이션의 2 버튼을 누르면 보여지는 데이터가 바뀌어야 한다.', () => {
    reset()
    const beforeData = screen.getAllByTestId('trade-table-item')
    const pagenationButtons = screen.getByTestId('pagination-bar').firstChild

    expect(pagenationButtons).not.toBeNull()

    if (!pagenationButtons?.childNodes[3]) return
    fireEvent.click(pagenationButtons.childNodes[3])
    const afterData = screen.getAllByTestId('trade-table-item')
    expect(beforeData).not.toEqual(afterData)

    if (!pagenationButtons?.childNodes[2]) return
    fireEvent.click(pagenationButtons.childNodes[2])
    expect(beforeData).toEqual(screen.getAllByTestId('trade-table-item'))
  })
})
