import { IconButton } from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'

function SortIcon(props: { typeID: string; sortBy: string[]; onClick: any }) {
  const { typeID, sortBy, onClick } = props
  const color = typeID === sortBy[0] ? 'teal' : 'gray'
  const buttonClickHandler = () => {
    onClick()
  }
  if (typeID === sortBy[0] && sortBy[1] === 'DESC')
    return (
      <IconButton
        variant="unstyled"
        aria-label="down"
        color={color}
        icon={<ChevronDownIcon />}
        onClick={buttonClickHandler}
      />
    )
  return (
    <IconButton
      variant="unstyled"
      aria-label="up"
      color={color}
      icon={<ChevronUpIcon />}
      onClick={buttonClickHandler}
    />
  )
}

export default SortIcon
