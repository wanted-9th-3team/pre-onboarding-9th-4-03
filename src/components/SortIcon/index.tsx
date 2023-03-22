import { IconButton } from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import useUrlSearch from '@hooks/useUrlSearch'

interface ISortIconProps {
  typeID: string
  sortBy: string
}

function SortIcon({ typeID, sortBy }: ISortIconProps) {
  const { setSearchParams } = useUrlSearch()
  const [sortType, sortOrder] = sortBy.split('_')
  const color = typeID === sortType ? 'teal' : 'gray'

  const iconClickHandler = (typeId: string) => {
    if (typeId !== sortType) {
      setSearchParams({ sort_by: `${typeId}_DESC` })
      return
    }
    if (sortOrder === 'ASC') {
      setSearchParams({ sort_by: `${typeId}_DESC` })
      return
    }
    setSearchParams({ sort_by: `${typeId}_ASC` })
  }

  if (typeID === sortType && sortOrder === 'DESC')
    return (
      <IconButton
        variant="unstyled"
        aria-label="down"
        icon={<ChevronDownIcon />}
        color={color}
        onClick={() => iconClickHandler(typeID)}
      />
    )
  return (
    <IconButton
      variant="unstyled"
      aria-label="up"
      color={color}
      icon={<ChevronUpIcon />}
      onClick={() => iconClickHandler(typeID)}
    />
  )
}

export default SortIcon
