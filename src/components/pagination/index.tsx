import React from 'react'
import { Pagination } from 'pagination-react-js'
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
  tradeLength: number
}

function PaginationBar({
  entriesPerPage,
  tradeLength,
  currentPage,
}: IPagenationBarProps) {
  return (
    <Wrapper>
      <Pagination
        entriesPerPage={entriesPerPage.get}
        totalEntries={tradeLength}
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
