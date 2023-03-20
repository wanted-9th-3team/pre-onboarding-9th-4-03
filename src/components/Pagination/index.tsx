import { Button, ButtonGroup, Container } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../../store'
import { selectTotalTableLists } from '../../store/table/tableSelector'
import PaginationItem from '../PaginationItem'

interface PaginationProps {
  setPage: Dispatch<SetStateAction<number>>
  page: number
  perPage: number
}

function Pagination({ setPage, page, perPage }: PaginationProps) {
  const productsCount = useAppSelector(selectTotalTableLists)
  const numberOfButton = Math.ceil(productsCount / perPage)
  const pageNumbers = useMemo(
    () => Array.from({ length: numberOfButton }, (_, i) => i + 1),
    [numberOfButton]
  )
  const [arrayOfButton, setArrayOfButton] = useState<number[]>([])

  // 화살표 방향 클릴 이벤트
  const arrowButtonClickHandler = (arrowDirection: 'left' | 'right') => {
    if (arrowDirection === 'left') {
      setPage(prev => prev - 1)
    } else {
      setPage(prev => prev + 1)
    }
  }

  const pageNumberClickHandler = (pageNumber: number) => {
    setPage(pageNumber)
  }

  useEffect(() => {
    setArrayOfButton(pageNumbers)
  }, [page, pageNumbers])

  return (
    <Container>
      <nav style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="button"
          mr="10px"
          onClick={() => arrowButtonClickHandler('left')}
          isDisabled={page === 1}
          colorScheme="facebook"
        >
          <span>&#10094;</span>
        </Button>
        <ButtonGroup style={{ display: 'flex', listStyle: 'none' }}>
          {arrayOfButton.length > 0 &&
            arrayOfButton.map(button => {
              return (
                <PaginationItem
                  key={button}
                  pageNumber={button}
                  currentPage={page}
                  pageClickHandler={() => pageNumberClickHandler(button)}
                />
              )
            })}
        </ButtonGroup>
        <Button
          type="button"
          ml="10px"
          onClick={() => arrowButtonClickHandler('right')}
          isDisabled={page * perPage >= productsCount}
          colorScheme="facebook"
        >
          <span>&#10095;</span>
        </Button>
      </nav>
    </Container>
  )
}

export default Pagination
