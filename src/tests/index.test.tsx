import {
  act,
  render,
  screen,
  renderHook,
  waitFor,
} from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
// import SearchInput from './index'
import Home from '../pages/Home/index'

// test('sdsd', () => {
//   const queryClient = new QueryClient()
//   const wrapper = ({ children }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   )
//   const { result } = renderHook(() => useCustomHook(), { wrapper })

//   await waitFor(() => result.current.isSuccess)

//   expect(result.current.data).toEqual('Hello')
// })
// function useCustomHook(): any {
//   throw new Error('Function not implemented.')
// }
