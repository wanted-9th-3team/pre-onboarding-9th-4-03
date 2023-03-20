import { Button } from '@chakra-ui/react'
import styled from '@emotion/styled'

import React, { useEffect, useRef, useState } from 'react'

interface PaginationItemProps {
  pageNumber: number
  currentPage: number
  pageClickHandler: () => void
}
const CustomButton = styled(Button)`
  .clicked {
    background-color: blue;
  }
`

function PaginationItem({
  pageNumber,
  currentPage,
  pageClickHandler,
}: PaginationItemProps) {
  const [isFocused, setIsFocused] = useState(false)
  const pageNumberRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!pageNumberRef.current) return

    if (pageNumberRef.current.value === String(currentPage)) {
      setIsFocused(true)
    } else {
      setIsFocused(false)
    }
  }, [currentPage])

  return (
    <CustomButton
      className="page-item"
      onClick={pageClickHandler}
      value={pageNumber}
      ref={pageNumberRef}
      colorScheme={isFocused ? 'green' : 'gray'}
    >
      <span>{pageNumber}</span>
    </CustomButton>
  )
}

export default PaginationItem
