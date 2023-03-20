import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Select,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Ttable } from '../../Type'

interface ITableList {
  tableData: Ttable[]
}

function TableItem({ tableData }: ITableList) {
  const [sortName, setSortName] = useState('오름차순')
  const [timeName, setTimeName] = useState('오름차순')
  const nameArray = ['오름차순', '내림차순']
  const idurl = 'sort'
  const timeurl = 'timeAndDate'
  const navigate = useNavigate()

  const orderChangeHandler = (value: any) => {
    if (value === '오름차순') {
      navigate(`/sort`)
      setSortName('내림차순')
    } else {
      navigate('/')
      setSortName('오름차순')
    }
  }

  const timeChangeHandler = (value: any) => {
    if (value === '오름차순') {
      navigate(`/timeAndDate`)
      setTimeName('내림차순')
    } else {
      navigate('/')
      setTimeName('오름차순')
    }
  }

  return (
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>
            <Select
              // placeholder="주문번호"
              onChange={() => orderChangeHandler(sortName)}
              value={sortName}
            >
              {/* <option value="오름차순">오름차순</option>
            <option value="내림차순">내림차순</option> */}
              {nameArray.map(item => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Th>
          <Th>가격</Th>
          <Th>고객 번호</Th>
          <Th>고객 이름</Th>
          <Th>주문처리 상태</Th>
          <Th>
            <Select
              // placeholder="주문번호"
              onChange={() => timeChangeHandler(timeName)}
              value={timeName}
            >
              <option value="오름차순">오름차순</option>
              <option value="내림차순">내림차순</option>
            </Select>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {tableData &&
          tableData.map(item => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.currency}</Td>
              <Td>{item.customer_id}</Td>
              <Td>{item.customer_name}</Td>
              <Td>{item.status === false ? '접수' : '완료'}</Td>
              <Td>{item.transaction_time}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  )
}

export default TableItem
