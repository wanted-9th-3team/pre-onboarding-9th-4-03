import {
  TableContainer,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  Stack,
  Card,
  CardBody,
  Center,
  Button,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import usePaginate from '../../hooks/pagination/usePaginate'
import { useAppDispatch } from '../../store'
import { selectSearchedTableLists } from '../../store/table/tableSelector'
import {
  filterByStatusTable,
  sortTableLists,
} from '../../store/table/tableSlice'
import { SORTCATEGORY } from '../../Type'
import Pagination from '../Pagination'
import TableLists from '../TableLists'

const CustomTable = styled(Table)`
  th,
  td {
    text-align: center;
  }

  tr {
    th {
      font-size: 16px;
      font-weight: 700;
    }
    button {
      background-color: transparent;
    }
  }
`

const CustomCard = styled(Card)`
  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: #aaa;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5);
  }
`

function TableView() {
  const [isStatusTrue, setIsStatusTrue] = useState(false)
  const searchedTableLists = useSelector(selectSearchedTableLists)
  const dispatch = useAppDispatch()
  const { currentPage, perPageValue, setCurrentPage, currentPageProducts } =
    usePaginate(searchedTableLists)

  const sortById = () => {
    dispatch(sortTableLists(SORTCATEGORY.SORT_ID))
  }

  const sortByTransactionTime = () => {
    dispatch(sortTableLists(SORTCATEGORY.SORT_TRANSACTION))
  }

  const filterStatusHandler = () => {
    setIsStatusTrue(!isStatusTrue)
    dispatch(filterByStatusTable(!isStatusTrue))
  }

  return (
    <Stack>
      <CustomCard h="80vh" overflowY="auto">
        <CardBody h="100%">
          <TableContainer>
            <CustomTable>
              <Thead>
                <Tr>
                  <Th>
                    <Center>
                      <Button onClick={sortById}>주문번호</Button>
                    </Center>
                  </Th>
                  <Th>
                    <Button onClick={sortByTransactionTime}>
                      거래일 & 거래시간
                    </Button>
                  </Th>
                  <Th>
                    <Button onClick={filterStatusHandler}>주문처리상태</Button>
                  </Th>
                  <Th>고객번호</Th>
                  <Th>고객이름</Th>
                  <Th>가격</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentPageProducts.map(table => {
                  return (
                    <TableLists
                      key={table.id}
                      id={table.id}
                      currency={table.currency}
                      customerId={table.customer_id}
                      customerName={table.customer_name}
                      status={table.status}
                      transactionTime={table.transaction_time}
                    />
                  )
                })}
              </Tbody>
            </CustomTable>
          </TableContainer>
        </CardBody>
      </CustomCard>
      <Center h="10vh">
        <Pagination
          setPage={setCurrentPage}
          page={currentPage}
          perPage={perPageValue}
        />
      </Center>
    </Stack>
  )
}

export default TableView
