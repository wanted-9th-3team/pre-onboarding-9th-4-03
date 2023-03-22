import { Box, Button, Input } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function SearchingName() {
  const [searchInputState, setSearchInputState] = useState('')

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchNameInput = event.target.value
    setSearchInputState(searchNameInput)
  }

  const [searchParams, setSearchParams] = useSearchParams()
  const sortParams = searchParams.get('sortParams')
  const filterParams = searchParams.get('filterParams')

  const searchNameHandler = (data: string) => {
    if (sortParams !== null && filterParams !== null) {
      searchParams.set('searchNameParams', data)
      searchParams.set('filterParams', filterParams)
      searchParams.set('sortParams', sortParams)
      setSearchParams(searchParams)
    } else if (sortParams !== null) {
      searchParams.set('filterParams', data)
      searchParams.set('filterParams', 'all')
      searchParams.set('sortParams', sortParams)
      setSearchParams(searchParams)
    } else if (filterParams !== null) {
      searchParams.set('filterParams', data)
      searchParams.set('filterParams', filterParams)
      searchParams.set('sortParams', 'sortASC')
      setSearchParams(searchParams)
    } else {
      searchParams.set('filterParams', data)
      searchParams.set('filterParams', 'all')
      searchParams.set('sortParams', 'sortASC')
      setSearchParams(searchParams)
    }
  }
  return (
    <Box>
      <Input
        value={searchInputState}
        onChange={onChangeHandler}
        placeholder="고객이름"
      />

      <Button
        onClick={() => {
          searchNameHandler(searchInputState)
        }}
      >
        검색
      </Button>
    </Box>
  )
}

export default SearchingName
