/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'
import getOrderInfo from '../../apis/TableApi'
import { IOrderData } from '../../Type'
import Paging from '../../components/Paging'
import SortData from '../../components/SortData'
import FilterIsOrder from '../../components/FilterIsOrder'
import SearchingName from '../../components/SearchingName'

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filterParams = searchParams.get('filterParams')
  const sortParams = searchParams.get('sortParams')
  const searchNameParams = searchParams.get('searchNameParams')

  const [orderDataBase, setOrderDataBase] = useState<IOrderData[]>([])

  const [orderData, setOrderData] = useState<IOrderData[]>(orderDataBase)

  const [notFilterData, setNotFilterData] = useState<IOrderData[]>(orderData)

  const [notSearchData, setNotSearchData] = useState<IOrderData[]>(orderData)

  const [orderViewData, setOrderViewData] = useState<IOrderData[]>(orderData)

  const getDataBase = async () => {
    const data = await getOrderInfo()
    if (data) {
      setOrderDataBase(data)
    }
  }

  setInterval(getDataBase, 5000)

  useEffect(() => {
    if (orderDataBase.length !== 0) {
      const DATABASE = orderDataBase
        .filter((DataItem: IOrderData) => {
          const DateData = new Date(DataItem.transaction_time)
          return (
            DateData.getFullYear() === 2023 &&
            DateData.getDate() === 8 &&
            DateData.getMonth() === 2
          )
        })
        .sort(function sortASC(a: IOrderData, b: IOrderData) {
          if (a.id > b.id) {
            return 1
          }
          if (a.id < b.id) {
            return -1
          }
          return 0
        })
      setOrderData(DATABASE)
    }
  }, [orderDataBase])

  const [products, setProducts] = useState<IOrderData[]>(orderViewData)
  const [totalCount, setTotalCount] = useState(orderViewData.length)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(50)
  const [indexOfLastPost, setIndexOfLastPost] = useState(0)
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0)
  const [currentPosts, setCurrentPosts] = useState<IOrderData[]>([])

  useEffect(() => {
    setProducts(orderViewData)
    setTotalCount(products.length)
    setIndexOfLastPost(currentPage * postPerPage)
    setIndexOfFirstPost(indexOfLastPost - postPerPage)
    setCurrentPosts(products.slice(indexOfFirstPost, indexOfLastPost))
  }, [
    currentPage,
    indexOfLastPost,
    indexOfFirstPost,
    products,
    postPerPage,
    orderViewData,
  ])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const sortingHandler = (data: string | null) => {
    if (data === 'orderNumberDESC') {
      setOrderData(
        orderData.sort(function sortDESC(a: IOrderData, b: IOrderData) {
          if (a.id < b.id) {
            return 1
          }
          if (a.id > b.id) {
            return -1
          }
          return 0
        })
      )
    } else if (data === 'orderNumberASC') {
      setOrderData(
        orderData.sort(function sortDESC(a: IOrderData, b: IOrderData) {
          if (a.id > b.id) {
            return 1
          }
          if (a.id < b.id) {
            return -1
          }
          return 0
        })
      )
    } else if (data === 'orderTimeDESC') {
      setOrderData(
        orderData.sort(function sortDESC(a: IOrderData, b: IOrderData) {
          if (a.transaction_time < b.transaction_time) {
            return 1
          }
          if (a.transaction_time > b.transaction_time) {
            return -1
          }
          return 0
        })
      )
    } else if (data === 'orderTimeASC') {
      setOrderData(
        orderData.sort(function sortDESC(a: IOrderData, b: IOrderData) {
          if (a.transaction_time > b.transaction_time) {
            return 1
          }
          if (a.transaction_time < b.transaction_time) {
            return -1
          }
          return 0
        })
      )
    } else if (data === 'sortASC') {
      setOrderData(
        orderData.sort(function sortASC(a: IOrderData, b: IOrderData) {
          if (a.id > b.id) {
            return 1
          }
          if (a.id < b.id) {
            return -1
          }
          return 0
        })
      )
    }
  }

  const filterHandler = (data: string | null) => {
    if (data === 'O') {
      setOrderViewData(
        notFilterData.filter((DataItem: IOrderData) => {
          return DataItem.status === true
        })
      )
      setNotSearchData(
        orderData.filter((DataItem: IOrderData) => {
          return DataItem.status === true
        })
      )
    } else if (data === 'X') {
      setOrderViewData(
        notFilterData.filter((DataItem: IOrderData) => {
          return DataItem.status === false
        })
      )
      setNotSearchData(
        orderData.filter((DataItem: IOrderData) => {
          return DataItem.status === false
        })
      )
    } else if (data === 'all') {
      setOrderViewData(notFilterData)
      setNotSearchData(orderData)
    }
  }

  const searchNameHandler = () => {
    if (searchNameParams !== null) {
      setOrderViewData(
        notSearchData.filter((DataItem: IOrderData) => {
          return DataItem.customer_name.includes(searchNameParams)
        })
      )
      setNotFilterData(
        orderData.filter((DataItem: IOrderData) => {
          return DataItem.customer_name.includes(searchNameParams)
        })
      )
    }
  }

  useEffect(() => {
    filterHandler(filterParams)
    sortingHandler(sortParams)
    searchNameHandler()
  }, [orderData, filterParams, sortParams, searchNameParams])

  const sortingOnClickHandler = (data: string) => {
    let sortData = ''
    if (sortParams === 'orderNumberDESC' && data === 'orderNumberDESC') {
      sortData = 'orderNumberASC'
    } else if (data === 'orderNumberDESC') {
      sortData = 'orderNumberDESC'
    } else if (sortParams === 'orderTimeDESC' && data === 'orderTimeDESC') {
      sortData = 'orderTimeASC'
    } else if (data === 'orderTimeDESC') {
      sortData = 'orderTimeDESC'
    }

    if (filterParams !== null && searchNameParams !== null) {
      searchParams.set('sortParams', sortData)
      searchParams.set('filterParams', filterParams)
      searchParams.set('searchNameParams', searchNameParams)
      setSearchParams(searchParams)
    } else if (filterParams !== null) {
      searchParams.set('sortParams', sortData)
      searchParams.set('filterParams', filterParams)
      searchParams.set('searchNameParams', '')
      setSearchParams(searchParams)
    } else if (searchNameParams !== null) {
      searchParams.set('sortParams', sortData)
      searchParams.set('filterParams', 'all')
      searchParams.set('searchNameParams', searchNameParams)
      setSearchParams(searchParams)
    } else {
      searchParams.set('sortParams', sortData)
      searchParams.set('filterParams', 'all')
      searchParams.set('searchNameParams', '')
      setSearchParams(searchParams)
    }
  }

  return (
    <Box>
      <SortData />
      <FilterIsOrder />
      <SearchingName />
      <TableContainer>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th
                onClick={() => {
                  sortingOnClickHandler('orderNumberDESC')
                }}
              >
                주문번호
              </Th>
              <Th
                onClick={() => {
                  sortingOnClickHandler('orderTimeDESC')
                }}
              >
                거래시간
              </Th>
              <Th>고객번호</Th>
              <Th>고객이름</Th>
              <Th>가격</Th>
              <Th>주문처리상태</Th>
            </Tr>
          </Thead>
          {currentPosts.map((orderDataItem: IOrderData) => {
            return (
              <Tbody key={orderDataItem.id}>
                <Tr>
                  <Td>{orderDataItem.id}</Td>
                  <Td>{orderDataItem.transaction_time}</Td>
                  <Td>{orderDataItem.customer_id}</Td>
                  <Td>{orderDataItem.customer_name}</Td>
                  <Td>{orderDataItem.currency}</Td>
                  {orderDataItem.status ? <Td>O</Td> : <Td>X</Td>}
                </Tr>
              </Tbody>
            )
          })}
        </Table>
      </TableContainer>
      <Paging
        currentPage={currentPage}
        totalCount={totalCount}
        handlePageChange={handlePageChange}
      />
    </Box>
  )
}

export default Home
