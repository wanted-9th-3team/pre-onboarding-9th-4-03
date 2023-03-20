import { Button, Center, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { FormEvent, useRef } from 'react'
import { useAppDispatch } from '../../store'
import { searchByName, sortTableLists } from '../../store/table/tableSlice'
import { SORTCATEGORY } from '../../Type'

function TableControl() {
  const searchTermRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useAppDispatch()

  const resetClickHandler = () => {
    dispatch(sortTableLists(SORTCATEGORY.SORT_RESET))
  }

  const nameSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchTermRef.current) return

    const searchName = searchTermRef.current.value
    if (searchName !== null) {
      dispatch(searchByName(searchName))
    }
    searchTermRef.current.value = ''
  }

  return (
    <Center w="100%" padding="10px 0 " justifyContent="space-around">
      <form
        onSubmit={nameSubmitHandler}
        style={{
          display: 'flex',
        }}
      >
        <FormControl mr="10px" display="flex" alignItems="center">
          <FormLabel>Search</FormLabel>
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
      <Button onClick={resetClickHandler} colorScheme="red">
        reset
      </Button>
    </Center>
  )
}

export default TableControl
