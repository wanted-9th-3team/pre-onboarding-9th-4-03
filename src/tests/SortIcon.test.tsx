import { fireEvent, render, screen } from '@testing-library/react'
import TradeTable from '@components/TradeTable'
import { BrowserRouter } from 'react-router-dom'
import mock_data from '../data/mock_data.json'

export default function reset() {
  return render(
    <BrowserRouter>
      <TradeTable trade={mock_data} />
    </BrowserRouter>
  )
}

describe('<SortIcon />', () => {
  it('SortIcon 클릭 시 모양이 바뀌어야 한다.', () => {
    reset()
    const upIconsBeforeClick = screen.getAllByLabelText('up')

    expect(upIconsBeforeClick.length).toBe(2)

    fireEvent.click(upIconsBeforeClick[0])

    const upIconsAfterClick = screen.getAllByLabelText('up')
    const downIconsAfterClick = screen.getAllByLabelText('down')

    expect(upIconsAfterClick.length).toBe(1)
    expect(downIconsAfterClick.length).toBe(1)
  })
})
