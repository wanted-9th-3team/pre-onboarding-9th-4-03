import { useRef } from 'react'
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import useUrlSearch from '@hooks/useUrlSearch'

interface ISearchInputProps {
  onClickHandler: (inputValue: string) => void
}

function SearchInput({ onClickHandler }: ISearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { getSearchParams } = useUrlSearch()
  const inputDefaultValue = getSearchParams('name')

  const buttonClickHandler = () => {
    if (inputRef.current) onClickHandler(inputRef.current.value)
  }
  const enterPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputRef.current)
      onClickHandler(inputRef.current.value)
  }
  const deleteClickHandler = () => {
    onClickHandler('')
    if (inputRef.current) inputRef.current.value = ''
  }
  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type="text"
        placeholder="Customer Name"
        ref={inputRef}
        onKeyPress={enterPressHandler}
        defaultValue={inputDefaultValue}
      />
      <InputRightElement width="6.0rem">
        <IconButton
          aria-label="delete"
          size="xs"
          icon={<CloseIcon />}
          variant="unstyled"
          mr="2px"
          color="gray"
          onClick={deleteClickHandler}
        />
        <Button h="1.75rem" size="sm" onClick={buttonClickHandler}>
          search
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default SearchInput
