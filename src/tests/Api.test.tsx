import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { rest } from 'msw'
import App from '../App'
import server from './mocks/server'
import { render } from './providers/test-utils'

describe('TradeTable render data get from api', () => {
  it('render Trade list by api call success', async () => {
    render(<App />)

    const tradeTableList = await screen.findAllByTestId('trade-data-list')

    expect(tradeTableList).toHaveLength(50)
  })

  it('no render Trade list by api call fail', async () => {
    server.use(
      rest.get('mock_data.json', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    render(<App />)

    const noDataIndicator = await screen.findByText(/No data./i)

    expect(noDataIndicator).toBeInTheDocument()
  })
})
