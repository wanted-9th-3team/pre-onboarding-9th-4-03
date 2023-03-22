import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { tableSettingsAtom } from '../../atoms'

export default function Filter() {
  const [inputValue, setInputvalue] = useState('')
  const [tableSettings, setTableSettings] = useRecoilState(tableSettingsAtom)
  const handleKeyUp = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.code === 'Enter') {
      setTableSettings(state => {
        const newState = { ...state }
        newState.searched = inputValue
        return newState
      })
      setInputvalue('')
    }
  }
  const handleChange = (ev: React.FormEvent<HTMLInputElement>) => {
    ev.preventDefault()
    setInputvalue(ev.currentTarget.value)
  }
  const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault()
    setTableSettings(state => {
      const newState = { ...state }
      newState.statusFilter = !newState.statusFilter
      return newState
    })
  }
  return (
    <div>
      <input
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        value={inputValue}
        placeholder="사용자명을 입력해주세요"
      />
      <button type="submit" onClick={handleClick}>
        {tableSettings.statusFilter ? '되돌리기' : '완료된 것만 보기'}
      </button>
    </div>
  )
}
