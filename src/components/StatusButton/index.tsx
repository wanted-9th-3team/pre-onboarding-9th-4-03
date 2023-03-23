import { MouseEvent } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

interface IStatusButtonProps {
  status: string
  searchByStatus: (e: MouseEvent<HTMLButtonElement>) => void
}

function StatusButton({ status, searchByStatus }: IStatusButtonProps) {
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
        <MenuItem value="all" onClick={searchByStatus}>
          all
        </MenuItem>
        <MenuItem value="processing" onClick={searchByStatus}>
          processing
        </MenuItem>
        <MenuItem value="completed" onClick={searchByStatus}>
          completed
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default StatusButton
