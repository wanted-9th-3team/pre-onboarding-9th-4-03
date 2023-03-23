import React, { useState } from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, Table } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import TradeTableItem from '@components/TradeTableItem'
import PaginationBar from '@components/Pagination'
// import { usePagination } from 'pagination-react-js'
import App from '../App'
import { TradeItem } from '../Type'

// function reset() {
//   const queryClient = new QueryClient()
//   const { getByText, getByLabelText } = render(
//     <QueryClientProvider client={queryClient}>
//       <ChakraProvider>
//         <App />
//       </ChakraProvider>
//     </QueryClientProvider>
//   )

//   return { getByText, getByLabelText }
// }

describe('<TradeTableItem />', () => {
  const initialTradeItem: TradeItem = {
    id: '1',
    transaction_time: '2023-03-08 17:34:39',
    status: true,
    currency: '$59.78',
    customer_id: 3,
    customer_name: 'Test Name',
  }
  it('renders tableItem', () => {
    const { getByText } = render(
      <Table>
        <TradeTableItem nowTrade={initialTradeItem} />
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
  it('renders tableItem', () => {
    const [current, setCurrent] = useState(1)
    const entriesPerPage = {
      get: 50,
      set: (num: number) => {
        entriesPerPage.get = num
      },
    }
    const currentPage = {
      get: current,
      set: setCurrent,
    }
    const { getByText } = render(
      <PaginationBar
        entriesPerPage={entriesPerPage}
        currentPage={currentPage}
        tradeLength={210}
      />
    )
    expect(getByText('5')).toBeInTheDocument()
  })
})
