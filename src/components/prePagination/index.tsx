import { useEffect, useState, useCallback } from 'react'
import { TableContainer } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import TableItem from '../TableItem'
// import getTableInfo from '../../apis/TableApi.ts'
import { Ttable } from '../../Type'
import Pagination from '../pagination/index'
import { ContentData, filterNameData, orderData } from '../../atom/index'
// import Filter from '../Filter'

function PrePagination({ tableData }: any) {
  console.log(tableData)
  // console.log(tableData)
  /* 필터된 데이터가 들어온다~ */
  // const [tableDatas, setTableData] =
  //   useRecoilState(ContentData) /* 전체데이터 */

  const [tableDatas, setTableData] = useRecoilState(orderData) /* 전체데이터 */
  const [orderDatas, setOrderTableData] =
    useRecoilState(orderData) /* 전체데이터 */
  const [tableNameDatas, setTableNameData] =
    useRecoilState(filterNameData) /* 전체데이터 */
  const [product, setProduct] = useState<Ttable[]>()
  const [count, setCount] = useState<number>(0) /* 아이템 총 개수 */
  const [currentPage, setCurrentPage] =
    useState<number>(1) /* 현재 페이지. default 값으로 1 */
  const [postPerPage] = useState(50) /* 한 페이지에 보여질 아이템 수 */
  const indexOfLastPost = currentPage * postPerPage
  // console.log(indexOfLastPost)
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const [currentPosts, setCurrentPosts] = useState<Ttable[]>()
  // console.log(currentPosts)
  // console.log(indexOfFirstPost)
  const { name } = useParams()
  // console.log(name)
  const setPage = (currentPages: number) => {
    setCurrentPage(currentPages)
  }
  console.log(tableNameDatas)
  // const orderHandler = () => {
  //   const KKK = [...tableData]
  //   const Y = KKK.sort((a, b) => b.id - a.id)
  //   setTableData(Y)
  // }
  // // console.log(tableData)
  // const dateHandler = () => {
  //   const KKK = [...tableData]
  //   const YK = KKK.sort(
  //     (a, b) =>
  //       new Date(b.transaction_time).getTime() -
  //       new Date(a.transaction_time).getTime()
  //   )

  //   setTableData(YK)
  // }

  useEffect(() => {
    // setProduct(tableDatas)

    if (name === 'sort') {
      setProduct(orderDatas)
    } else if (name === 'name') {
      setProduct(tableNameDatas)
    }
    setProduct(tableData)

    console.log(product)
    const K = product ? product?.length : 0
    setCount(K)
    setCurrentPosts(product?.slice(indexOfFirstPost, indexOfLastPost))
  }, [
    indexOfFirstPost,
    indexOfLastPost,
    name,
    orderDatas,
    product,
    setTableData,
    tableData,
    tableDatas,
    tableNameDatas,
  ])
  console.log(product)
  return (
    <>
      {/* <Filter /> */}
      {/* <Link to="/sort">
        <button type="button" onClick={orderHandler}>
          주문번호
        </button>
      </Link>
      <button type="button" onClick={dateHandler}>
        거래일 & 거래시간
      </button> */}
      <TableContainer>
        <TableItem tableData={currentPosts!} />
      </TableContainer>
      <span>
        <Pagination
          setPage={setPage}
          currentPage={currentPage}
          count={count}
          postPerPage={postPerPage}
        />
      </span>
    </>
  )
}

export default PrePagination
