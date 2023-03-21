import { Button, ButtonGroup, Container } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import useUrlSearch from '../../hooks/urlSearch/useUrlSearch'
import PaginationItem from '../PaginationItem'

interface PaginationProps {
  totalTableCount: number
  setPage: Dispatch<SetStateAction<number>>
  page: number
  perPage: number
}

function Pagination({
  setPage,
  page,
  perPage,
  totalTableCount,
}: PaginationProps) {
  // 총 데이터 수와 페이지 당 데이터 수로 버튼 개수 구하기
  const numberOfButton = Math.ceil(totalTableCount / perPage)
  const pageNumbers = useMemo(
    () => Array.from({ length: numberOfButton }, (_, i) => i + 1),
    [numberOfButton]
  )
  const [arrayOfButton, setArrayOfButton] = useState<number[]>([])
  const { setSearchParams } = useUrlSearch()

  // 화살표 방향 클릴 이벤트
  const arrowButtonClickHandler = (arrowDirection: 'left' | 'right') => {
    if (arrowDirection === 'left') {
      setPage(prev => prev - 1)
      setSearchParams({ page: String(page - 1) })
    } else {
      setPage(prev => prev + 1)
      setSearchParams({ page: String(page + 1) })
    }
  }

  const pageNumberClickHandler = (pageNumber: number) => {
    setPage(pageNumber)
    setSearchParams({ page: String(pageNumber) })
  }

  // 들어오는 데이터가 변하면 그에 맞게 버튼 개수 변경
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
          isDisabled={page * perPage >= totalTableCount}
          colorScheme="facebook"
        >
          <span>&#10095;</span>
        </Button>
      </nav>
    </Container>
  )
}

export default Pagination
