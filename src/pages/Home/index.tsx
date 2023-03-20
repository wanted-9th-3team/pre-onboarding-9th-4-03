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

  const getDataBase = async () => {
    const data = await getOrderInfo()
    if (data) {
      setOrderDataBase(
        data
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
      )
    }
  }

  useEffect(() => {
    getDataBase()
  }, [])

  const [products, setProducts] = useState<IOrderData[]>(orderData)
  const [totalCount, setTotalCount] = useState(orderData.length)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(50)
  const [indexOfLastPost, setIndexOfLastPost] = useState(0)
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0)
  const [currentPosts, setCurrentPosts] = useState<IOrderData[]>([])

  useEffect(() => {
    setProducts(orderData)
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
    orderData,
  ])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const filterHandler = (data: string) => {
    if (data === 'O') {
      setOrderData(
        orderDataBase.filter((DataItem: IOrderData) => {
          return DataItem.status === true
        })
      )
    } else if (data === 'X') {
      setOrderData(
        orderDataBase.filter((DataItem: IOrderData) => {
          return DataItem.status === false
        })
      )
    } else if (data === 'all') {
      setOrderData(orderDataBase)
    }
  }

  const sortingHandler = (data: string) => {
    if (data === 'orderNumber') {
      setOrderData(
        orderDataBase.sort(function sortDESC(a: IOrderData, b: IOrderData) {
          if (a.id < b.id) {
            return 1
          }
          if (a.id > b.id) {
            return -1
          }
          return 0
        })
      )
    } else if (data === 'orderTime') {
      setOrderData(
        orderDataBase.sort(function sortDESC(a: IOrderData, b: IOrderData) {
          if (a.transaction_time < b.transaction_time) {
            return 1
          }
          if (a.transaction_time > b.transaction_time) {
            return -1
          }
          return 0
        })
      )
    } else if (data === 'sortASC') {
      setOrderData(
        orderDataBase.sort(function sortASC(a: IOrderData, b: IOrderData) {
          if (a.id > b.id) {
            return 1
          }
          if (a.id < b.id) {
            return -1
          }
          return 0
        })
      )
    } else {
      setOrderData(orderData)
    }
  }

  const searchNameHandler = () => {
    if (searchNameParams !== null) {
      setOrderData(
        orderDataBase.filter((DataItem: IOrderData) => {
          return DataItem.customer_name.includes(searchNameParams)
        })
      )
    }
  }

  useEffect(() => {
    if (filterParams !== null) {
      filterHandler(filterParams)
    } else {
      console.log('filterParams is null')
    }
    if (sortParams !== null) {
      sortingHandler(sortParams)
    } else {
      console.log('sortParams is null')
    }
    if (searchNameParams !== null) {
      searchNameHandler()
    } else {
      console.log('searchNameParams is null')
    }

    console.log(filterParams)
    console.log(sortParams)
    console.log(searchNameParams)
  }, [searchParams])

  return (
    <Box>
      <SortData />
      <FilterIsOrder />
      <SearchingName />
      <TableContainer>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th>주문번호</Th>
              <Th>거래시간</Th>
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
