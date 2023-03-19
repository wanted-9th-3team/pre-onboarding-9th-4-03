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
import getOrderInfo from '../../apis/TableApi'
import { IOrderData } from '../../Type'
import Paging from '../../components/Paging'
import SortData from '../../components/SortData'

function Home() {
  const [orderDataBase, setOrderDataBase] = useState<IOrderData[]>([])

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

  const [products, setProducts] = useState<IOrderData[]>(orderDataBase)
  const [totalCount, setTotalCount] = useState(orderDataBase.length)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(50)
  const [indexOfLastPost, setIndexOfLastPost] = useState(0)
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0)
  const [currentPosts, setCurrentPosts] = useState<IOrderData[]>([])

  useEffect(() => {
    setProducts(orderDataBase)
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
    orderDataBase,
  ])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Box>
      <SortData
        orderDataBase={orderDataBase}
        setOrderDataBase={setOrderDataBase}
      />

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
          {currentPosts.map((orderData: IOrderData) => {
            return (
              <Tbody key={orderData.id}>
                <Tr>
                  <Td>{orderData.id}</Td>
                  <Td>{orderData.transaction_time}</Td>
                  <Td>{orderData.customer_id}</Td>
                  <Td>{orderData.customer_name}</Td>
                  <Td>{orderData.currency}</Td>
                  {orderData.status ? <Td>O</Td> : <Td>X</Td>}
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
