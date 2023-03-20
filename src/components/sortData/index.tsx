import { Box, Button } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

function SortData() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filterParams = searchParams.get('filterParams')
  const searchNameParams = searchParams.get('searchNameParams')

  const sortingHandler = (data: string) => {
    if (filterParams !== null && searchNameParams !== null) {
      searchParams.set('sortParams', data)
      searchParams.set('filterParams', filterParams)
      searchParams.set('searchNameParams', searchNameParams)
      setSearchParams(searchParams)
    } else if (filterParams !== null) {
      searchParams.set('sortParams', data)
      searchParams.set('filterParams', filterParams)
      searchParams.set('searchNameParams', '')
      setSearchParams(searchParams)
    } else if (searchNameParams !== null) {
      searchParams.set('sortParams', data)
      searchParams.set('filterParams', 'all')
      searchParams.set('searchNameParams', searchNameParams)
      setSearchParams(searchParams)
    } else {
      searchParams.set('sortParams', data)
      searchParams.set('filterParams', 'all')
      searchParams.set('searchNameParams', '')
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
