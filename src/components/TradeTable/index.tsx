import { useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { usePagination } from 'pagination-react-js'
import { TradeItem } from '../../Type'
import TradeTableItem from '../TradeTableItem'
import PaginationBar from '../Pagination'
import SearchInput from '../SearchInput'
import SortIcon from '../SortIcon'
import StatusButton from '../StatusButton'
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
  const [sortBy, setSortBy] = useState('주문번호 오름차')
  const [status, setStatus] = useState('전체')
  const [name, setName] = useState('')

  const sortTrade = (nowTrade: TradeItem[] | undefined | null) => {
    switch (sortBy) {
      case '거래시간 오름차':
        return sortByTransactonTimeASC(nowTrade)
      case '거래시간 내림차':
        return sortByTransactonTimeDESC(nowTrade)
      case '주문번호 내림차':
        return sortByIDDESC(nowTrade)
      default:
        return sortByIDASC(nowTrade)
    }
  }

  const searchByName = (inputName: string) => {
    setName(inputName)
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
    const nowSortBy = sortBy.split(' ')
    if (typeID === nowSortBy[0]) {
      if (nowSortBy[1] === '오름차') setSortBy(`${typeID} 내림차`)
      else setSortBy(`${typeID} 오름차`)
    } else {
      setSortBy(`${typeID} 내림차`)
    }
  }

  return (
    <div>
      <SearchInput onClickHandler={searchByName} />
      <PaginationBar
        currentPage={currentPage}
        entriesPerPage={entriesPerPage}
        trade={name ? filterTradeByCustomerName(trade, name) : trade}
      />
      <TableContainer>
        <Table variant="simple">
          <TableCaption>거래 내역</TableCaption>
          <Thead>
            <Tr>
              <Th>
                주문번호
                <SortIcon
                  typeID="주문번호"
                  sortBy={sortBy.split(' ')}
                  onClick={() => iconClickHandler('주문번호')}
                />
              </Th>
              <Th>
                거래시간
                <SortIcon
                  typeID="거래시간"
                  sortBy={sortBy.split(' ')}
                  onClick={() => iconClickHandler('거래시간')}
                />
              </Th>
              <Th>
                주문처리상태
                <StatusButton status={status} setStatus={setStatus} />
              </Th>
              <Th>고객번호</Th>
              <Th>고객이름</Th>
              <Th>가격</Th>
            </Tr>
          </Thead>
          <Tbody>{TradeTableItems(filterAll())}</Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TradeTable
