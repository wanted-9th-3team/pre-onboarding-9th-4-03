import { act, fireEvent, render, screen } from '@testing-library/react'
import SortIcon from '@components/SortIcon'
import { BrowserRouter } from 'react-router-dom'
import mock_data from '../data/mock_data.json'

test('gi', () => {
  const onClickHandler = () => {}
  // act(()=>{
  //   render(<SearchInput {...} /> ,props)
  // })
  const typeID = 'gray'
  const sortBy = `${typeID}_DESC`
  // const mock_dataDown = mock_data.sort((a, b) => b.id - a.id)
  // const item = {
  //   typeID = 'gray',
  //   sortBy = `${typeID}_DESC`,
  // }
  render(<SortIcon typeID={typeID} sortBy={sortBy} />, {
    wrapper: BrowserRouter,
  })
  const name = screen.getByLabelText('down')
  fireEvent.click(name)
  // fireEvent.change(screen.getByPlaceholderText('Customer Name'), {
  //   target: { value: 'a' },
  // })
  // const input = screen.getByDisplayValue('a')
  // expect(name).toEqual(`${typeID}_DESC`)
})
