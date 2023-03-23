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

describe('<StatusButton />', () => {
  it('StatusButton 상태 변경 시 이름이 바뀌어야 한다.', () => {
    reset()
    const statusMenuList = screen.getByTestId('status-menu-list')

    statusMenuList.childNodes.forEach(menu => {
      fireEvent.click(menu)
      const statusMenuButton = screen.getByTestId('status-menu-button')
      expect(menu.textContent).toEqual(statusMenuButton.textContent)
    })
  })
})
