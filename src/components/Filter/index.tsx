import { Link } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { ContentData, orderData } from '../../atom/index'

function useFilter() {
  const [tableDatas, setTableData] = useRecoilState(orderData) /* 전체데이터 */

  const filterHandler = () => {
    setTableData(tableDatas?.filter(item => item.status === true))
  }

  const filterdHandler = () => {
    setTableData(tableDatas?.filter(item => item.status === false))
  }

  return (
    <div>
      <button type="button" onClick={() => filterHandler()}>
        ok
      </button>
      <button type="button" onClick={() => filterdHandler()}>
        no
      </button>
    </div>
  )
}

export default useFilter
