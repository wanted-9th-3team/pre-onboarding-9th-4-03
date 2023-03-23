import { fireEvent, render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import SearchInput from '@components/SearchInput'
import { it, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

describe('SearchInput', () => {
  const onCilckHandler = vi.fn()

  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <SearchInput onClickHandler={onCilckHandler} />
      </BrowserRouter>
    )
    const textElement = screen.getByPlaceholderText('Customer Name')
    expect(textElement).toBeInTheDocument()
  })

  it('delte button delete input value correctly', async () => {
    render(
      <BrowserRouter>
        <SearchInput onClickHandler={onCilckHandler} />
      </BrowserRouter>
    )
    const deleteButton = screen.getByLabelText(/delete/i)
    expect(deleteButton).toBeInTheDocument()
    const nameSearchInput = screen.getByPlaceholderText('Customer Name')

    fireEvent.change(nameSearchInput, { target: { value: 'howard' } })
    await user.click(deleteButton)

    expect(nameSearchInput).toHaveTextContent('')
  })
})
