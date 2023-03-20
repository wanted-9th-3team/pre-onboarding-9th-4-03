/* eslint-disable react/destructuring-assignment */
import { Box, Button } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

function FilterIsOrder() {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortParams = searchParams.get('sortParams')

  const filterHandler = (data: string) => {
    if (sortParams !== null) {
      searchParams.set('filterParams', data)
      searchParams.set('sortParams', sortParams)
      setSearchParams(searchParams)
    } else {
      searchParams.set('filterParams', data)
      searchParams.set('sortParams', 'sortASC')
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
