/* eslint-disable react/destructuring-assignment */
import { Box, Button } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

function FilterIsOrder() {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortParams = searchParams.get('sortParams')
  const searchNameParams = searchParams.get('searchNameParams')

  const filterHandler = (data: string) => {
    if (sortParams !== null && searchNameParams !== null) {
      searchParams.set('filterParams', data)
      searchParams.set('sortParams', sortParams)
      searchParams.set('searchNameParams', searchNameParams)
      setSearchParams(searchParams)
    } else if (sortParams !== null) {
      searchParams.set('filterParams', data)
      searchParams.set('sortParams', sortParams)
      searchParams.set('searchNameParams', '')
      setSearchParams(searchParams)
    } else if (searchNameParams !== null) {
      searchParams.set('filterParams', data)
      searchParams.set('sortParams', 'sortASC')
      searchParams.set('searchNameParams', searchNameParams)
      setSearchParams(searchParams)
    } else {
      searchParams.set('filterParams', data)
      searchParams.set('sortParams', 'sortASC')
      searchParams.set('searchNameParams', '')
      setSearchParams(searchParams)
    }
  }

  return (
    <Box>
      주문 처리 상태 :
      <Button
        onClick={() => {
          filterHandler('all')
        }}
      >
        전체
      </Button>
      <Button
        onClick={() => {
          filterHandler('O')
        }}
      >
        O
      </Button>
      <Button
        onClick={() => {
          filterHandler('X')
        }}
      >
        X
      </Button>
    </Box>
  )
}

export default FilterIsOrder
