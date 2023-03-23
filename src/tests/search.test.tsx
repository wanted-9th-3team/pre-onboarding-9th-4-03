import { act, fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter, useSearchParams } from 'react-router-dom'
import SearchInput from '../components/SearchInput/index'

// test('gi', () => {
//   const onClickHandler = () => {}
//   // act(()=>{
//   //   render(<SearchInput {...} /> ,props)
//   // })
//   render(<SearchInput onClickHandler={() => {}} />, {
//     wrapper: BrowserRouter,
//   })
//   fireEvent.change(screen.getByPlaceholderText('Customer Name'), {
//     target: { value: 'a' },
//   })
//   const input = screen.getByDisplayValue('a')
//   expect(input.value).toEqual('a') /* 이거 오류났는데 통과가 됨,,,ㅠ?왜지 */
// })

// function deleteName() {
//   const [urlTerm, serUrlTerm] = useSearchParams()
//   return render(<SearchInput onClickHandler={() => {}} />, {
//     wrapper: BrowserRouter,
//   })
// }

describe('<Search input and button />', () => {
  it('input writing string', () => {
    const onClickHandler = () => {}
    // act(()=>{
    //   render(<SearchInput {...} /> ,props)
    // })
    render(<SearchInput onClickHandler={() => {}} />, {
      wrapper: BrowserRouter,
    })
    fireEvent.change(screen.getByPlaceholderText('Customer Name'), {
      target: { value: 'a' },
    })
    const input = screen.getByDisplayValue('a')
    // expect(input.value).toEqual('a') /* 이거 오류났는데 통과가 됨,,,ㅠ?왜지 */
  })

  // it('click x button and params and input bar delete', () => {
  //   render(<SearchInput onClickHandler={() => {}} />, {
  //     wrapper: BrowserRouter,
  //   })
  //   const name = screen.getByLabelText('delete')
  //   fireEvent.click(name)
  //   expect(name).toHaveAttribute()
  //
})
