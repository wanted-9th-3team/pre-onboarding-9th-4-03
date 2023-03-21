import { Button, Center, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { FormEvent, useEffect, useRef } from 'react'
import useUrlSearch from '../../hooks/urlSearch/useUrlSearch'

function TableControl() {
  const searchTermRef = useRef<HTMLInputElement | null>(null)
  const { setSearchParams, resetSearchParams, getSearchParams } = useUrlSearch()

  const resetClickHandler = () => {
    resetSearchParams()
    if (!searchTermRef.current) return
    searchTermRef.current.value = ''
  }

  const nameSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchTermRef.current) return

    const searchName = searchTermRef.current.value
    if (searchName !== null) {
      const encodedSearchTerm = encodeURIComponent(searchName)
      setSearchParams({ query: encodedSearchTerm })
    }
  }

  useEffect(() => {
    const searchTerm = getSearchParams('query')
    if (searchTerm) {
      if (!searchTermRef.current) return
      searchTermRef.current.value = searchTerm
    }
  }, [getSearchParams])

  return (
    <Center w="100%" padding="10px 0 " position="relative">
      <form
        onSubmit={nameSubmitHandler}
        style={{
          display: 'flex',
        }}
      >
        <FormControl mr="20px" display="flex" alignItems="center">
          <FormLabel fontSize="20px">Search</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Enter customer Name"
            ref={searchTermRef}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          submit
        </Button>
      </form>
      <Button
        onClick={resetClickHandler}
        colorScheme="red"
        position="absolute"
        right="10px"
      >
        reset
      </Button>
    </Center>
  )
}

export default TableControl
