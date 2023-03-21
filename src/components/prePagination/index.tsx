import { useEffect, useState, useCallback } from 'react'
import { TableContainer } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
// import { useQuery } from 'react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import TableItem from '../TableItem'
import { Ttable } from '../../Type'
import Pagination from '../pagination/index'
import { ContentData, NameData, productData } from '../../atom/index'

function PrePagination({ tableData }: any) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [tableDatas, setTableDatas] =
    useRecoilState(ContentData) /* 전체데이터 */
  const [named, setNamed] = useRecoilState(NameData)
  const [product, setProduct] = useRecoilState(productData)
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

  // function timeSortHandler() {
  //   if (searchParams.get('sort') === 'timeAndDate') {
  //     const filterOrderName = [...tableDatas]
  //     // setProduct(

  //     // )
  //     const BB = filterOrderName.sort(
  //       (a: any, b: any) =>
  //         new Date(b.transaction_time).getTime() -
  //         new Date(a.transaction_time).getTime()
  //     )
  //     return BB
  //   }
  //   return null
  // }

  const filterHandler = useCallback(() => {
    const filterTrue = [...tableData]
    if (searchParams.get('boolean') === 'true') {
      const AK = filterTrue?.filter((item: any) => item.status === true)
      return AK
    }
    if (searchParams.get('boolean') === 'false') {
      const BK = filterTrue?.filter((item: any) => item.status === false)
      return BK
    }
    if (searchParams.get('boolean') === 'ALL') {
      const CK = filterTrue?.map(item => item)
      return CK
    }
    return filterTrue
  }, [searchParams, tableData])

  const NameHandler = useCallback(
    (names: string | undefined, nameparam: any) => {
      // if (searchParams.get('name') === nameparam) {
      //   const filterOrderName = [...tableDatas]
      //   const KK = filterOrderName?.filter(
      //     item => item.customer_name === nameparam
      //   )

      //   setProduct(KK)
      // }
      // sortIdHandler()
      // if (searchParams.get('sort') === 'id') {
      //   const filterOrderName = [...tableDatas]
      //   const AAA = filterOrderName.sort((a: any, b: any) => b.id - a.id)
      //   setProduct(AAA)
      // }
      // const KK = sortIdHandler()
      // console.log(KK)
      // const LL = timeSortHandler()
      // console.log(LL)
      const JJ = filterHandler()
      console.log(JJ)

      /* sort의 값중 id나 time~이 있으면 sort을 하고 
      만약 true 또는 flase라면 또 필터링 분기가 총 4개 존재 */
      const filterDataed = [...tableDatas]
      const AAAAA = searchParams.get('boolean') ? JJ : filterDataed
      const DDDDD =
        searchParams.get('sort') === 'id'
          ? AAAAA.sort((a, b) => b.id - a.id)
          : searchParams.get('sort') === 'timeAndDate'
          ? AAAAA.sort(
              (a, b) =>
                new Date(b.transaction_time).getTime() -
                new Date(a.transaction_time).getTime()
            )
          : AAAAA

      console.log(DDDDD)
      setProduct(DDDDD)
      // const sortString = searchParams.get('sort')
      // const booleanString: string = searchParams.get('boolean')
      // sortString === id ? KK : LL
      // const ASD = sortString === 'id' ? KK : LL
      // if (searchParams.get('sort') && searchParams.get('boolean')) {
      //   // const arr2 = KK.filter(x1 => JJ.some(x2 => x1.status === x2.idx))
      //   // const ASD = sortString === 'id' ? KK : LL
      //   // const arr2 = ASD?.filter(el => el.status === booleanString)
      // }

      // if (names === 'filter') {
      //   const filterTrue = [...tableData]
      //   const filterData =
      //     searchParams.get('boolean') === 'true'
      //       ? filterTrue?.filter((item: any) => item.status === true)
      //       : searchParams.get('boolean') === 'false'
      //       ? filterTrue?.filter((item: any) => item.status === false)
      //       : searchParams.get('boolean') === 'ALL'
      //       ? filterTrue?.map(item => item)
      //       : filterTrue /* 기본주소가 /가 안되는 중... ㅎ */
      //   setProduct(filterData)
      // }
      // if (searchParams.get('sort') === 'timeAndDate') {
      //   const filterOrderName = [...tableDatas]
      //   setProduct(
      //     filterOrderName.sort(
      //       (a: any, b: any) =>
      //         new Date(b.transaction_time).getTime() -
      //         new Date(a.transaction_time).getTime()
      //     )
      //   )
      // }
      // if (names === undefined) {
      //   setProduct(tableData)
      // }
    },
    [filterHandler, searchParams, setProduct, tableDatas]
  )

  useEffect(() => {
    NameHandler(name, named)
  }, [NameHandler, name, named])

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
