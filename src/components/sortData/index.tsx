import { Box, Button } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

function SortData() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filterParams = searchParams.get('filterParams')
  const searchNameParams = searchParams.get('searchNameParams')
  const sortParams = searchParams.get('sortParams')

  const sortingHandler = (data: string) => {
    let sortData = ''
    if (sortParams === 'orderNumberDESC' && data === 'orderNumberDESC') {
      sortData = 'orderNumberASC'
    } else if (data === 'orderNumberDESC') {
      sortData = 'orderNumberDESC'
    } else if (sortParams === 'orderTimeDESC' && data === 'orderTimeDESC') {
      sortData = 'orderTimeASC'
    } else if (data === 'orderTimeDESC') {
      sortData = 'orderTimeDESC'
    }

    if (filterParams !== null && searchNameParams !== null) {
      searchParams.set('sortParams', sortData)
      searchParams.set('filterParams', filterParams)
      searchParams.set('searchNameParams', searchNameParams)
      setSearchParams(searchParams)
    } else if (filterParams !== null) {
      searchParams.set('sortParams', sortData)
      searchParams.set('filterParams', filterParams)
      searchParams.set('searchNameParams', '')
      setSearchParams(searchParams)
    } else if (searchNameParams !== null) {
      searchParams.set('sortParams', sortData)
      searchParams.set('filterParams', 'all')
      searchParams.set('searchNameParams', searchNameParams)
      setSearchParams(searchParams)
    } else {
      searchParams.set('sortParams', sortData)
      searchParams.set('filterParams', 'all')
      searchParams.set('searchNameParams', '')
      setSearchParams(searchParams)
    }
  }
  return (
    <Box>
      <Button
        onClick={() => {
          sortingHandler('orderNumberDESC')
        }}
      >
        주문번호순으로 보기
      </Button>
      <Button
        onClick={() => {
          sortingHandler('orderTimeDESC')
        }}
      >
        거래시간순으로 보기
      </Button>
    </Box>
  )
}

export default SortData
