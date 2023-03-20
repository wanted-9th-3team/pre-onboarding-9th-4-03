import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { ContentData } from '../../atom/index'

function NameFilter() {
  const [tableDatas, setTableData] =
    useRecoilState(ContentData) /* 전체데이터 */
  const [name, setName] = useState('')

  const nameHandler = (e: any) => {
    setName(e.target.value)
  }

  const nameFiltereHandler = () => {
    const A = tableDatas.filter(item => item.customer_name === name)
    setTableData(A)
  }
  return (
    <div>
      <input value={name} onChange={nameHandler} />
      <button type="button" onClick={nameFiltereHandler}>
        필터링
      </button>
    </div>
  )
}

export default NameFilter
