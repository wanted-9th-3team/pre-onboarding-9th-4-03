import React from 'react'
import { useSetRecoilState } from 'recoil'
import { tableSettingsAtom } from '../../atoms'

export default function SortButtons() {
  const setTableSettings = useSetRecoilState(tableSettingsAtom)
  const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault()
    setTableSettings(state => {
      const newState = { ...state }
      newState.sortOption = ev.currentTarget.innerText
      return newState
    })
  }
  return (
    <div>
      <span>정렬:</span>
      <button type="submit" onClick={handleClick}>
        원래대로
      </button>
      <button type="submit" onClick={handleClick}>
        주문번호
      </button>
      <button type="submit" onClick={handleClick}>
        거래시간
      </button>
    </div>
  )
}
