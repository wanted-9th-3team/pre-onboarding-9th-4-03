import { useEffect, useState, useCallback } from 'react'
import { TableContainer } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
// import { useQuery } from 'react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import TableItem from '../TableItem'
import { Ttable } from '../../Type'
import Pagination from '../pagination/index'
import { ContentData } from '../../atom/index'

function PrePagination({ tableData }: any) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [tableDatas, setTableDatas] =
    useRecoilState(ContentData) /* 전체데이터 */

  console.log(tableDatas)

  const [product, setProduct] = useState<Ttable[]>()
  const [count, setCount] = useState<number>(0) /* 아이템 총 개수 */
  const [currentPage, setCurrentPage] =
    useState<number>(1) /* 현재 페이지. default 값으로 1 */
  const [postPerPage] = useState(50) /* 한 페이지에 보여질 아이템 수 */
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const [currentPosts, setCurrentPosts] = useState<Ttable[]>()
  const { name } = useParams()

  const setPage = (currentPages: number) => {
    setCurrentPage(currentPages)
  }

  const NameHandler = useCallback(
    (names: string | undefined) => {
      if (names === 'sort') {
        const filterOrderName = [...tableDatas]
        setProduct(filterOrderName.sort((a: any, b: any) => b.id - a.id))
      }
      // if (names === 'name') {
      //   setProduct(tableNameDatas)
      // }
      if (names === 'filter') {
        const filterTrue = [...tableData]
        const filterData =
          searchParams.get('boolean') === 'truely'
            ? filterTrue?.filter((item: any) => item.status === true)
            : filterTrue?.filter((item: any) => item.status === false)
        setProduct(filterData)
      }
      if (names === 'timeAndDate') {
        const filterOrderName = [...tableDatas]
        setProduct(
          filterOrderName.sort(
            (a: any, b: any) =>
              new Date(b.transaction_time).getTime() -
              new Date(a.transaction_time).getTime()
          )
        )
      }
      if (names === undefined) {
        setProduct(tableData)
      }
    },
    [searchParams, tableData, tableDatas]
  )

  useEffect(() => {
    NameHandler(name)
  }, [NameHandler, name])

  useEffect(() => {
    const K = product ? product?.length : 0
    setCount(K)
    setCurrentPosts(product?.slice(indexOfFirstPost, indexOfLastPost))
  }, [indexOfFirstPost, indexOfLastPost, product])

  return (
    <>
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
