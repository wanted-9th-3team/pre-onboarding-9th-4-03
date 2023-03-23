import { fireEvent, screen } from '@testing-library/react'
import TradeTable from '@components/TradeTable'
import { BrowserRouter } from 'react-router-dom'
import mock_data from '../data/mock_data.json'
import { render } from './providers/testUtils'

export default function reset() {
  return render(
    <BrowserRouter>
      <TradeTable trade={mock_data} />
    </BrowserRouter>
  )
}

describe('<PaginationBar />', () => {
  it('tradeData가 mock_data인 경우, 페이지네이션 버튼이 10개여야 한다.', () => {
    reset()
    const paginationBar = screen.getByTestId('pagination-bar').firstChild

    expect(paginationBar?.childNodes.length).toBe(10)
  })

  it('tradeData가 mock_data인 경우, 페이지네이션의 2 버튼을 누르면 보여지는 데이터가 바뀌어야 한다.', () => {
    reset()
    const beforeData = screen.getAllByTestId('trade-data-list')
    const pagenationButtons = screen.getByTestId('pagination-bar').firstChild

    expect(pagenationButtons).not.toBeNull()

    if (!pagenationButtons?.childNodes[3]) return
    fireEvent.click(pagenationButtons.childNodes[3])
    const afterData = screen.getAllByTestId('trade-data-list')
    expect(beforeData).not.toEqual(afterData)

    if (!pagenationButtons?.childNodes[2]) return
    fireEvent.click(pagenationButtons.childNodes[2])
    expect(beforeData).toEqual(screen.getAllByTestId('trade-data-list'))
  })
})
