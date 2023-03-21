import { useSearchParams } from 'react-router-dom'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { usePagination } from 'pagination-react-js'
import { TradeItem } from '../../Type'
import TradeTableItem from '../TradeTableItem'
import PaginationBar from '../Pagination'
import SearchInput from '../SearchInput'
import SortIcon from '../SortIcon'
import StatusButton from '../StatusButton'
import WrapperTableContainer from './styles'
import {
  sortByIDDESC,
  sortByIDASC,
  sortByTransactonTimeDESC,
  sortByTransactonTimeASC,
} from '../../utils/sort'
import {
  filterTradeByCustomerName,
  filterTradeByStatus,
} from '../../utils/filter'

function TradeTableItems(trade: TradeItem[]) {
  return trade.map(item => <TradeTableItem key={item.id} nowTrade={item} />)
}

function TradeTable(props: { trade: TradeItem[] }) {
  const { trade } = props
  const { currentPage, entriesPerPage, entries } = usePagination(1, 50)
  const [searchParams, setSearchParams] = useSearchParams()
  const sortBy = searchParams.get('sort_by')
    ? (searchParams.get('sort_by') as string)
    : 'id_ASC'
  const status = searchParams.get('status')
    ? (searchParams.get('status') as string)
    : 'all'
  const name = searchParams.get('name')
    ? (searchParams.get('name') as string)
    : ''

  const sortTrade = (nowTrade: TradeItem[] | undefined | null) => {
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
  }

  const getAllSearchParams = () => {
    let params = {}
    let isDone = false
    const nowParams = searchParams.entries()
    while (!isDone) {
      const param = nowParams.next()
      if (param.value) params = { ...params, [param.value[0]]: param.value[1] }
      isDone = !!param.done
    }
    return params
  }

  const searchByName = (inputName: string) => {
    setSearchParams({ ...getAllSearchParams(), name: inputName })
  }

  const filterAll = () => {
    let result = []
    if (name) {
      result = filterTradeByCustomerName(trade, name).slice(
        entries.indexOfFirst,
        entries.indexOfLast
      )
    } else {
      result = trade.slice(entries.indexOfFirst, entries.indexOfLast)
    }
    result = filterTradeByStatus(result, status)
    return sortTrade(result) as TradeItem[]
  }

  const iconClickHandler = (typeID: string) => {
    const nowSortBy = sortBy.split('_')
    if (typeID === nowSortBy[0]) {
      if (nowSortBy[1] === 'ASC')
        setSearchParams({ ...getAllSearchParams(), sort_by: `${typeID}_DESC` })
      else
        setSearchParams({ ...getAllSearchParams(), sort_by: `${typeID}_ASC` })
    } else {
      setSearchParams({ ...getAllSearchParams(), sort_by: `${typeID}_DESC` })
    }
  }

  const statusChangeHandler = (nowStatus: string) => {
    setSearchParams({ ...getAllSearchParams(), status: nowStatus })
  }

  return (
    <div>
      <Grid templateColumns="repeat(2, 1fr)">
        <GridItem colSpan={1}>
          <PaginationBar
            currentPage={currentPage}
            entriesPerPage={entriesPerPage}
            trade={name ? filterTradeByCustomerName(trade, name) : trade}
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
                <SortIcon
                  typeID="id"
                  sortBy={sortBy.split('_')}
                  onClick={() => iconClickHandler('id')}
                />
              </Th>
              <Th>
                Transaction Time
                <SortIcon
                  typeID="time"
                  sortBy={sortBy.split('_')}
                  onClick={() => iconClickHandler('time')}
                />
              </Th>
              <Th>
                status
                <StatusButton status={status} setStatus={statusChangeHandler} />
              </Th>
              <Th>Customer ID</Th>
              <Th>Customer Name</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>{TradeTableItems(filterAll())}</Tbody>
        </Table>
      </WrapperTableContainer>
    </div>
  )
}

export default TradeTable
