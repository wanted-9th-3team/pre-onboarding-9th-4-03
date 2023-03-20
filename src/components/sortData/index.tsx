import { Box, Button } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

function SortData() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filterParams = searchParams.get('filterParams')

  const sortingHandler = (data: string) => {
    if (filterParams !== null) {
      searchParams.set('sortParams', data)
      searchParams.set('filterParams', filterParams)
      setSearchParams(searchParams)
    } else {
      searchParams.set('sortParams', data)
      searchParams.set('filterParams', 'all')
      setSearchParams(searchParams)
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
