import { useState, useEffect, useCallback, MouseEvent } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { usePagination } from 'pagination-react-js'
import { filterTradeByCustomerName, filterTradeByStatus } from '@utils/filter'
import {
  sortByIDDESC,
  sortByIDASC,
  sortByTransactonTimeDESC,
  sortByTransactonTimeASC,
} from '@utils/sort'
import useUrlSearch from '@hooks/useUrlSearch'
import TradeTableItem from '@components/TradeTableItem'
import PaginationBar from '@components/Pagination'
import SearchInput from '@components/SearchInput'
import SortIcon from '@components/SortIcon'
import StatusButton from '@components/StatusButton'
import { TradeItem } from '../../Type'
import WrapperTableContainer from './styles'

interface ITradeTableProps {
  trade: TradeItem[]
}

function TradeTableItems({ nowTrade }: { nowTrade: TradeItem[] }) {
  if (nowTrade.length > 0)
    return (
      <>
        {nowTrade.map(item => (
          <TradeTableItem key={item.id} nowTrade={item} />
        ))}
      </>
    )
  return (
    <Tr>
      <Td colSpan={6} style={{ textAlign: 'center' }}>
        No data.
      </Td>
    </Tr>
  )
}

function TradeTable({ trade }: ITradeTableProps) {
  const { setSearchParams, getSearchParams } = useUrlSearch()
  const sortBy = getSearchParams('sort_by')
  const status = getSearchParams('status')
  const name = getSearchParams('name')
  const page = getSearchParams('page')
  const [tradeLength, setTradeLength] = useState(trade.length)
  const { currentPage, entriesPerPage, entries } = usePagination(
    Number(page.length === 0 ? 1 : page),
    50
  )
  const { set: currentPageSet, get: currentPageGet } = currentPage

  const sortTrade = useCallback(
    (nowTrade: TradeItem[]) => {
      switch (sortBy) {
        case 'time_ASC':
          return sortByTransactonTimeASC(nowTrade)
        case 'time_DESC':
          return sortByTransactonTimeDESC(nowTrade)
        case 'id_DESC':
          return sortByIDDESC(nowTrade)
        default:
          return sortByIDASC(nowTrade)
      }
    },
    [sortBy]
  )

  const searchByName = (inputName: string) => {
    const encodedSearchTerm = encodeURIComponent(inputName)
    setSearchParams({ name: encodedSearchTerm })
    currentPageSet(1)
  }

  const searchByStatus = (e: MouseEvent<HTMLButtonElement>) => {
    setSearchParams({ status: e.currentTarget.value })
    currentPageSet(1)
  }

  const filterAll = useCallback(() => {
    let result = [...trade]
    if (name) {
      result = filterTradeByCustomerName(result, name)
    }
    result = filterTradeByStatus(result, status ?? 'all')
    result = sortTrade(result)

    return result
  }, [trade, name, status, sortTrade])

  useEffect(() => {
    setSearchParams({ page: currentPageGet.toString() })
  }, [currentPageGet, setSearchParams])

  useEffect(() => {
    setTradeLength(filterAll().length)
  }, [filterAll])

  return (
    <div>
      <Grid templateColumns="repeat(2, 1fr)">
        <GridItem colSpan={1}>
          <PaginationBar
            currentPage={currentPage}
            entriesPerPage={entriesPerPage}
            tradeLength={tradeLength}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <SearchInput onClickHandler={searchByName} />
        </GridItem>
      </Grid>
      <WrapperTableContainer>
        <Table variant="striped" colorScheme="gray">
          <TableCaption>Order List</TableCaption>
          <Thead>
            <Tr>
              <Th>
                ID
                <SortIcon typeID="id" sortBy={sortBy} />
              </Th>
              <Th>
                Transaction Time
                <SortIcon typeID="time" sortBy={sortBy} />
              </Th>
              <Th>
                status
                <StatusButton status={status} searchByStatus={searchByStatus} />
              </Th>
              <Th>Customer ID</Th>
              <Th>Customer Name</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            <TradeTableItems
              nowTrade={filterAll().slice(
                entries.indexOfFirst,
                entries.indexOfLast
              )}
            />
          </Tbody>
        </Table>
      </WrapperTableContainer>
    </div>
  )
}

export default TradeTable
