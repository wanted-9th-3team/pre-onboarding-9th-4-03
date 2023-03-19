import { Box, Button } from '@chakra-ui/react'
import { ISortData } from '../../Type'

function SortData({ orderDataBase, setOrderDataBase }: ISortData) {
  const sortingHandler = (data: string) => {
    if (data === 'orderNumber') {
      setOrderDataBase(
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
      setOrderDataBase(
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
    }
  }

  return (
    <Box>
      <Button
        onClick={() => {
          sortingHandler('orderNumber')
        }}
      >
        주문번호순으로 보기
      </Button>
      <Button
        onClick={() => {
          sortingHandler('orderTime')
        }}
      >
        거래시간순으로 보기
      </Button>
    </Box>
  )
}

export default SortData
