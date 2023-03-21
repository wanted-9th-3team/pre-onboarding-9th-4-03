import {
  TableContainer,
  Thead,
  Table,
  Tr,
  Tbody,
  Stack,
  Card,
  Center,
  Box,
  CardBody,
  Td,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useCallback, useEffect } from 'react'
import usePaginate from '../../hooks/pagination/usePaginate'
import useGetTableQuery from '../../hooks/queries/useGetTableQuery'
import useTableSorting from '../../hooks/sorting/useTableSorting'
import UseUrlSearch from '../../hooks/urlSearch/useUrlSearch'
import Pagination from '../Pagination'
import TableControl from '../TableControl'
import TableHeader from '../TableHeader'
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
  const { useGetAllTableDataQuery } = useGetTableQuery()
  const { data: originTableList } = useGetAllTableDataQuery()
  const { sortedData, sortAndFilterTableData } = useTableSorting(
    originTableList ?? []
  )
  const {
    currentPage,
    perPageValue,
    currentPageProducts,
    setCurrentPage,
    perPageValueHandler,
  } = usePaginate(sortedData)
  const { setSearchParams, resetSearchParams, getAllSearchParams } =
    UseUrlSearch()

  const currentPageSettingHandler = useCallback(() => {
    const lastPageNumber = perPageValueHandler(sortedData)
    if (typeof lastPageNumber === 'number') {
      setSearchParams({ page: String(lastPageNumber) })
      setCurrentPage(() => lastPageNumber)
    }
  }, [sortedData, perPageValueHandler, setSearchParams, setCurrentPage])

  // sorting 과 filtering 으로 테이블이 변할 때마다 현재 page 값 조정
  useEffect(() => {
    if (!sortedData.length) return
    currentPageSettingHandler()
  }, [sortedData, currentPageSettingHandler])

  // 처음 들어와서 url search params 를 보고 테이블 값 조정
  useEffect(() => {
    const currentParams = getAllSearchParams()
    if (!currentParams.status) {
      resetSearchParams()
    } else {
      sortAndFilterTableData(currentParams)
    }
  }, [resetSearchParams, getAllSearchParams, sortAndFilterTableData])

  return (
    <Stack h="85vh">
      <Box display="flex" alignItems="center">
        <TableControl />
      </Box>
      <CustomCard h="100%" overflowY="auto">
        <CardBody h="100%">
          <TableContainer>
            <CustomTable>
              <Thead>
                <TableHeader />
              </Thead>
              <Tbody>
                {currentPageProducts.length === 0 ? (
                  <Tr>
                    <Td>데이터가 없습니다.</Td>
                  </Tr>
                ) : (
                  currentPageProducts.map(table => {
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
                  })
                )}
              </Tbody>
            </CustomTable>
          </TableContainer>
        </CardBody>
      </CustomCard>
      <Center>
        <Pagination
          totalTableCount={sortedData.length}
          setPage={setCurrentPage}
          page={currentPage}
          perPage={perPageValue}
        />
      </Center>
    </Stack>
  )
}

export default TableView
