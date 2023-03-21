import React from 'react'
import { Pagination } from 'pagination-react-js'
import { TradeItem } from '../../Type'
import Wrapper from './styles'

function PaginationBar(props: {
  entriesPerPage: {
    get: number // Returns the maximum number of entries per page
    set: (arg: number) => void // Updates the maximum number of entries per page
  }
  currentPage: {
    get: number // Returns the active page number
    set: React.Dispatch<React.SetStateAction<number>> // Updates the active page number
  }
  trade: TradeItem[]
}) {
  const { entriesPerPage, currentPage, trade } = props
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
        navStart="&#171;" // Here you can pass anything (Text, HTML Tag, React Component, ...)
        navEnd="&#187;" // Here you can pass anything (Text, HTML Tag, React Component, ...)
        navPrev="&#x2039;" // Here you can pass anything (Text, HTML Tag, React Component, ...)
        navNext="&#x203a;" // Here you can pass anything (Text, HTML Tag, React Component, ...)
        navPrevCustom={{
          steps: 5,
          content:
            '\u00B7\u00B7\u00B7' /* Here you can pass anything (Text, HTML Tag, React Component, ...) */,
        }}
        navNextCustom={{
          steps: 5,
          content:
            '\u00B7\u00B7\u00B7' /* Here you can pass anything (Text, HTML Tag, React Component, ...) */,
        }}
      />
    </Wrapper>
  )
}

export default PaginationBar
