import React from 'react'
import { Pagination } from 'pagination-react-js'
import { TradeItem } from '../../Type'
import Wrapper from './styles'

interface IPagenationBarProps {
  entriesPerPage: {
    get: number
    set: (arg: number) => void
  }
  currentPage: {
    get: number
    set: React.Dispatch<React.SetStateAction<number>>
  }
  trade: TradeItem[]
}

function PaginationBar({
  entriesPerPage,
  trade,
  currentPage,
}: IPagenationBarProps) {
  return (
    <Wrapper>
      <Pagination
        entriesPerPage={entriesPerPage.get}
        totalEntries={trade.length}
        currentPage={{ get: currentPage.get, set: currentPage.set }}
        offset={2}
        classNames={{
          wrapper: 'pagination',
          item: 'pagination-item',
          itemActive: 'pagination-item-active',
          navPrev: 'pagination-item nav-item',
          navNext: 'pagination-item nav-item',
          navStart: 'pagination-item nav-item',
          navEnd: 'pagination-item nav-item',
          navPrevCustom: 'pagination-item',
          navNextCustom: 'pagination-item',
        }}
        navStart="&#171;"
        navEnd="&#187;"
        navPrev="&#x2039;"
        navNext="&#x203a;"
        navPrevCustom={{
          steps: 5,
          content: '\u00B7\u00B7\u00B7',
        }}
        navNextCustom={{
          steps: 5,
          content: '\u00B7\u00B7\u00B7',
        }}
      />
    </Wrapper>
  )
}

export default PaginationBar
