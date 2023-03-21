import { useRef } from 'react'
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

function SearchInput(props: { onClickHandler: (inputValue: string) => any }) {
  const { onClickHandler } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonClickHandler = () => {
    if (inputRef.current) onClickHandler(inputRef.current.value)
  }
  const EnterPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputRef.current)
      onClickHandler(inputRef.current.value)
  }
  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type="text"
        placeholder="Customer Name"
        ref={inputRef}
        onKeyPress={EnterPressHandler}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={buttonClickHandler}>
          search
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default SearchInput
