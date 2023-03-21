import { useEffect, useState, useCallback } from 'react'
import { TableContainer } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { useSearchParams } from 'react-router-dom'
import TableItem from '../TableItem'
import { Ttable } from '../../Type'
import Pagination from '../pagination/index'
import { ContentData, NameData, productData } from '../../atom/index'

function PrePagination() {
  const [searchParams] = useSearchParams() /* url query받아오기 */
  const [tableDatas, setTableDatas] =
    useRecoilState(ContentData) /* 전체데이터 */
  const [named, setNamed] =
    useRecoilState(
      NameData
    ) /* 검색한 이름 =>useRecoilValue로 하면 검색이 안되는 현상 발생? 왜일까 */
  const [product, setProduct] = useRecoilState(productData)
  const [count, setCount] = useState<number>(0) /* 아이템 총 개수 */
  const [currentPage, setCurrentPage] =
    useState<number>(1) /* 현재 페이지. default 값으로 1 */
  const [postPerPage] = useState(50) /* 한 페이지에 보여질 아이템 수 */
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const [currentPosts, setCurrentPosts] = useState<Ttable[]>()

  const setPage = (currentPages: number) => {
    setCurrentPage(currentPages)
  }

  const filterHandler = useCallback(() => {
    const filterTrue = [...tableDatas]
    if (searchParams.get('status') === 'true') {
      const AK = filterTrue?.filter((item: any) => item.status === true)
      return AK
    }
    if (searchParams.get('status') === 'false') {
      const BK = filterTrue?.filter((item: any) => item.status === false)
      return BK
    }
    if (searchParams.get('status') === 'ALL') {
      const CK = filterTrue?.map(item => item)
      return CK
    }
    return filterTrue
  }, [searchParams, tableDatas])

  const NameHandler = useCallback(() => {
    const statusfiltering = filterHandler()

    /* sort의 값중 id나 time~이 있으면 sort을 하고 
      만약 true 또는 flase라면 또 필터링 분기가 총 4개 존재 */
    const filterDataed = [...tableDatas]
    const statusData = searchParams.get('status')
      ? statusfiltering
      : filterDataed

    const sortData =
      searchParams.get('sort') === 'id'
        ? statusData.sort((a, b) => b.id - a.id)
        : searchParams.get('sort') === 'timeAndDate'
        ? statusData.sort(
            (a, b) =>
              new Date(b.transaction_time).getTime() -
              new Date(a.transaction_time).getTime()
          )
        : statusData

    const filteredALL = searchParams.get('name')?.toString()
      ? sortData.filter(list => list.customer_name === named)
      : sortData

    setProduct(filteredALL)
  }, [filterHandler, named, searchParams, setProduct, tableDatas])

  useEffect(() => {
    NameHandler()
  }, [NameHandler])

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
