import { MouseEvent } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import useUrlSearch from '@hooks/useUrlSearch'

interface IStatusButtonProps {
  status: string
}

function StatusButton({ status }: IStatusButtonProps) {
  const { setSearchParams } = useUrlSearch()

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setSearchParams({ status: e.currentTarget.value })
  }

  return (
    <Menu>
      <MenuButton
        size="xs"
        as={Button}
        minW="95px"
        rightIcon={<ChevronDownIcon />}
      >
        {status.length ? status : 'all'}
      </MenuButton>
      <MenuList>
        <MenuItem value="all" onClick={onClickHandler}>
          all
        </MenuItem>
        <MenuItem value="processing" onClick={onClickHandler}>
          processing
        </MenuItem>
        <MenuItem
          data-testid="filter-button-status"
          value="completed"
          onClick={onClickHandler}
        >
          completed
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default StatusButton
