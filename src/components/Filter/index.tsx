import { Link } from 'react-router-dom'
// import { useRecoilState, useSetRecoilState } from 'recoil'

// import { ContentData, orderData, filterTrueData } from '../../atom/index'

function useFilter() {
  // const setTableData = useSetRecoilState(filterTrueData) /* 전체데이터 */

  // const filterHandler = () => {
  //   setTableData(tableData?.filter((item: any) => item.status === true))
  // }

  // const filterdHandler = () => {
  //   setTableData(tableData?.filter((item: any) => item.status === false))
  // }

  return (
    <div>
      <Link to="/filter?boolean=truely">
        <button type="button">ok</button>
      </Link>
      <Link to="filter?boolean=falsly">
        <button type="button">no</button>
      </Link>
    </div>
  )
}

export default useFilter
