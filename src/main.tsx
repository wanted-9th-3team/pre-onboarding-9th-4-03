import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>
)
