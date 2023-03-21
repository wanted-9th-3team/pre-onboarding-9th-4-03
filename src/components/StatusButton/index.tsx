import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

function StatusButton(props: {
  status: string
  setStatus: (nowStatus: string) => void
}) {
  const { status, setStatus } = props

  const onClickHandler = (clickedStatus: string) => {
    setStatus(clickedStatus)
  }
  return (
    <Menu>
      <MenuButton
        size="xs"
        as={Button}
        minW="95px"
        rightIcon={<ChevronDownIcon />}
      >
        {status}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            onClickHandler('all')
          }}
        >
          all
        </MenuItem>
        <MenuItem
          onClick={() => {
            onClickHandler('processing')
          }}
        >
          processing
        </MenuItem>
        <MenuItem
          onClick={() => {
            onClickHandler('completed')
          }}
        >
          completed
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default StatusButton
