// import React from 'react'
// import { render } from '@testing-library/react'
// import { ChakraProvider } from '@chakra-ui/react'
// import { QueryClient, QueryClientProvider } from 'react-query'
// import App from '../App'

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

// describe('<TradeTable />', () => {
//   it('renders header', () => {
//     const { getByText, getByLabelText } = reset()

//   })
// })
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/Home'
import NotFound from '@pages/NotFound'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from '../App'

describe('App render home route', () => {
  it('full app rendering/navigating', async () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )

    expect(screen.getByAltText(/switch won/i)).toBeInTheDocument()
  })

  it('landing on a Nofound page', () => {
    const badRoute = '/sf'

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /not found/i
    )
  })
})
