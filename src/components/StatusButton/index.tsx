import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

function StatusButton(props: {
  status: string
  setStatus: React.Dispatch<React.SetStateAction<string>>
}) {
  const { status, setStatus } = props

  const onClickHandler = (clickedStatus: string) => {
    setStatus(clickedStatus)
  }
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {status}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            onClickHandler('전체')
          }}
        >
          전체
        </MenuItem>
        <MenuItem
          onClick={() => {
            onClickHandler('진행중')
          }}
        >
          진행중
        </MenuItem>
        <MenuItem
          onClick={() => {
            onClickHandler('완료')
          }}
        >
          완료
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default StatusButton
