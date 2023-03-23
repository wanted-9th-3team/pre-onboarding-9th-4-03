import React from 'react'
import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from '../App'

function reset() {
  const queryClient = new QueryClient()
  const { getByText, getByLabelText } = render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  )

  return { getByText, getByLabelText }
}

// describe('<TradeTable />', () => {
//   it('renders header', () => {
//     const { getByText, getByLabelText } = reset()
//     const button = screen.getByLabelText('search')
//     console.log(button)
//   })

it('page button', () => {
  const onClickHandler = jest.fn()
})
