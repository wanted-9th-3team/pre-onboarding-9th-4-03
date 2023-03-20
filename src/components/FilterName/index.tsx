import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { ContentData, orderData, filterNameData } from '../../atom/index'

function NameFilter({ tableData }: any) {
  const [tableDatas, setTableData] =
    useRecoilState(filterNameData) /* 전체데이터 */
  const [name, setName] = useState('')
  console.log(tableDatas)
  const nameHandler = (e: any) => {
    setName(e.target.value)
  }

  const nameFiltereHandler = () => {
    const A = tableData.filter((item: any) => item.customer_name === name)
    setTableData(A)
    console.log(A)
  }

  console.log(tableDatas)
  return (
    <div>
      <input value={name} onChange={nameHandler} />
      <Link to="/name">
        <button type="button" onClick={nameFiltereHandler}>
          필터링
        </button>
      </Link>
    </div>
  )
}

export default NameFilter
