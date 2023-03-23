import { fireEvent, render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import TradeTable from '@components/TradeTable'
import { TradeItem } from 'Type'
import { BrowserRouter } from 'react-router-dom'

const mockTable: TradeItem[] = [
  {
    id: '1',
    transaction_time: '2023-03-08 17:39:50',
    status: true,
    customer_id: 15,
    customer_name: 'Holmes Howard',
    currency: '$5.61',
  },
  {
    id: '2',
    transaction_time: '2023-03-08 06:59:37',
    status: true,
    customer_id: 16,
    customer_name: 'Cynthia Terrell',
    currency: '$10.99',
  },
  {
    id: '3',
    transaction_time: '2023-03-08 06:59:40',
    status: false,
    customer_id: 15,
    customer_name: 'Ann Barron',
    currency: '$10.00',
  },
]

function reset(tableData: TradeItem[]) {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TradeTable trade={tableData} />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('TradeTable render ', () => {
  it('render Trade list', async () => {
    reset(mockTable)

    const tradeTableList = screen.getAllByTestId('trade-data-list')

    expect(tradeTableList).toHaveLength(mockTable.length)
  })

  it('can not render Trade list', async () => {
    reset([])

    const noDataIndicator = screen.getByText(/No data./i)

    expect(noDataIndicator).toBeInTheDocument()
  })
})

describe('TradeTable sorting funtion', () => {
  it('render id_desc sorted tradetable when click sort button', async () => {
    user.setup()
    reset(mockTable)
    const beforeRenderIdValue = screen.getAllByTestId('trade-data-list-id')
    const sortButton = screen.getByTestId('sort-button-id')

    await user.click(sortButton)
    const afterRenderValue = screen.getAllByTestId('trade-data-list-id')

    expect(afterRenderValue).not.toEqual(beforeRenderIdValue)
  })

  it('render time_desc sorted tradetable when click sort button', async () => {
    user.setup()
    reset(mockTable)

    const beforeRenderTimeValue = screen.getAllByTestId('trade-data-list-time')
    const timeButton = screen.getByTestId('sort-button-time')

    await user.click(timeButton)
    const afterRenderValue = screen.getAllByTestId('trade-data-list-time')

    expect(afterRenderValue).not.toEqual(beforeRenderTimeValue)
  })
})

describe('TradeTable filtering funtion', () => {
  it('render status_true filtered tradetable when click filter status button', async () => {
    user.setup()
    reset(mockTable)

    const filteredMockData = mockTable.filter(table => table.status === true)
    const statusButton = screen.getByTestId('filter-button-status')

    await user.click(statusButton)

    const afterRenderValue = screen.getAllByTestId('trade-data-list-status')

    expect(afterRenderValue).toHaveLength(filteredMockData.length)
  })

  it('render name = Howard filtered tradetable when type howard to input tag', async () => {
    user.setup()
    reset(mockTable)

    const filteredMockData = mockTable.filter(table =>
      table.customer_name.toLowerCase().includes('howard')
    )

    const nameSearchInput = screen.getByPlaceholderText('Customer Name')
    fireEvent.change(nameSearchInput, { target: { value: 'howard' } })
    const searchButton = screen.getByText('search')

    await user.click(searchButton)

    const afterRenderValue = screen.getAllByTestId('trade-data-list-name')

    expect(afterRenderValue).toHaveLength(filteredMockData.length)
  })

  it('render name = Howard filtered tradetable when type howard to input tag and key press Enter ', async () => {
    user.setup()
    reset(mockTable)

    const filteredMockData = mockTable.filter(table =>
      table.customer_name.toLowerCase().includes('howard')
    )

    const nameSearchInput = screen.getByPlaceholderText('Customer Name')
    fireEvent.change(nameSearchInput, { target: { value: 'howard' } })

    fireEvent.keyPress(nameSearchInput, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    })

    const afterRenderValue = screen.getAllByTestId('trade-data-list-name')

    expect(afterRenderValue).toHaveLength(filteredMockData.length)
  })
})
