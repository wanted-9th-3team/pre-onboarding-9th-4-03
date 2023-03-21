import { Button, Center, Select, Th, Tr } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import useUrlSearch from '../../hooks/urlSearch/useUrlSearch'

function TableHeader() {
  const [isIdAsc, setIsIdAsc] = useState(false)

  const { setSearchParams } = useUrlSearch()

  const sortByIdHandler = () => {
    setIsIdAsc(!isIdAsc)
    setSearchParams({ sort: !isIdAsc ? 'id_asc' : 'id_desc' })
  }

  const sortByTransactionTimeHandler = () => {
    setSearchParams({ sort: 'time' })
  }

  const filterStatusHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const statusValue = e.target.value

    setSearchParams({ status: statusValue })
  }

  return (
    <Tr>
      <Th>
        <Center>
          <Button onClick={sortByIdHandler}>주문번호</Button>
        </Center>
      </Th>
      <Th>
        <Button onClick={sortByTransactionTimeHandler}>
          거래일 & 거래시간
        </Button>
      </Th>
      <Th>
        <Center>
          주문처리상태
          <Select
            size="xs"
            ml="10px"
            variant="filled"
            borderRadius="10px"
            onChange={filterStatusHandler}
          >
            <option value="all">all</option>
            <option value="false">처리 중</option>
            <option value="true">처리 완료</option>
          </Select>
        </Center>
      </Th>
      <Th>고객번호</Th>
      <Th>고객이름</Th>
      <Th>가격</Th>
    </Tr>
  )
}

export default TableHeader
