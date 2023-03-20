import { useEffect, useState, useCallback } from 'react'
import { TableContainer } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'

import getTableInfo from '../../apis/TableApi.ts'
import { Ttable } from '../../Type'

import { ContentData, orderData } from '../../atom/index'
import FilterName from '../../components/FilterName'
import PrePagination from '../../components/prePagination'

function Home({ tableData }: any) {
  const [tableDatas, setTableData] =
    useRecoilState(ContentData) /* 전체데이터 */
  const [orderDatas, setOrderTableData] =
    useRecoilState(orderData) /* 전체데이터 */
  // const [count, setCount] = useState<number>(0) /* 아이템 총 개수 */
  // const [currentPage, setCurrentPage] =
  //   useState<number>(1) /* 현재 페이지. default 값으로 1 */
  // const [postPerPage] = useState(50) /* 한 페이지에 보여질 아이템 수 */
  // const indexOfLastPost = currentPage * postPerPage
  // const indexOfFirstPost = indexOfLastPost - postPerPage
  // const [currentPosts, setCurrentPosts] = useState<Ttable[]>()
  // const name = useParams()

  // const dataHandler = useCallback(async () => {
  //   const response: Ttable[] = await getTableInfo()
  //   const filteredRes = response.filter(
  //     el => el.transaction_time.split(' ')[0] === '2023-03-08'
  //   )
  //   setTableData(filteredRes)
  //   console.log(filteredRes)
  //   return response
  // }, [setTableData])
  // useEffect(() => {
  //   dataHandler()
  // }, [dataHandler])

  // const setPage = (currentPages: number) => {
  //   setCurrentPage(currentPages)
  // }

  const orderHandler = () => {
    const KKK = [...tableDatas]
    const Y = KKK.sort((a, b) => b.id - a.id)
    setTableData(Y)
    setOrderTableData(Y)
  }

  const dateHandler = () => {
    const KKK = [...tableData]
    const YK = KKK.sort(
      (a, b) =>
        new Date(b.transaction_time).getTime() -
        new Date(a.transaction_time).getTime()
    )

    setTableData(YK)
  }

  // useEffect(() => {
  //   const K = tableData ? tableData?.length : 0
  //   setCount(K)
  //   setCurrentPosts(tableData?.slice(indexOfFirstPost, indexOfLastPost))
  // }, [indexOfFirstPost, indexOfLastPost, tableData])

  return (
    <>
      {/* <Filter /> */}
      <Link to="/sort">
        <button type="button" onClick={orderHandler}>
          주문번호
        </button>
      </Link>
      <button type="button" onClick={dateHandler}>
        거래일 & 거래시간
      </button>
      <button type="button" onClick={dateHandler}>
        거래일 & 거래시간
      </button>
      <FilterName tableData={tableDatas} />
      {/* <TableContainer>
        <TableItem tableData={currentPosts!} />
      </TableContainer>

      <Pagination setPage={setPage} currentPage={currentPage} count={count} /> */}
      <PrePagination tableData={tableDatas} />
    </>
  )
}

export default Home
