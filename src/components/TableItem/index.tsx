import { Table, Thead, Tbody, Tr, Th, Td, Select } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Ttable } from '../../Type'

interface ITableList {
  tableData: Ttable[]
}

function TableItem({ tableData }: ITableList) {
  const [sortName, setSortName] = useState('오름차순')
  const [timeName, setTimeName] = useState('오름차순')
  const [trueName, setTrueName] = useState('ALL')
  const [searchParams, setSearchParams] = useSearchParams()
  const nameArray = ['오름차순', '내림차순']
  // const idurl = 'sort'
  // const timeurl = 'timeAndDate'
  const navigate = useNavigate()

  const sortname = searchParams.get('sort')
  const timename = searchParams.get('time')
  const booleanName = searchParams.get('boolean')
  const Nameparam = searchParams.get('name')

  const orderChangeHandler = (value: any) => {
    if (value === '오름차순') {
      navigate(`/filter?sort=id`)
      searchParams.set('sort', 'id')
      setSortName('내림차순')
    } else {
      navigate('/')
      setSortName('오름차순')
      searchParams.set('sort', '')
    }
  }

  const timeChangeHandler = (value: any) => {
    if (value === '오름차순') {
      navigate(`/filter?sort=timeAndDate`)
      searchParams.set('sorts', 'timeAndDate')
      setTimeName('내림차순')
    } else {
      navigate('/')
      searchParams.set('time', '')
      setTimeName('오름차순')
    }
  }

  const booleanNameHandler = (e: any) => {
    setTrueName(e.target.value)
  }

  const TrueChangeHandler = useCallback(() => {
    if (trueName === 'ALL') {
      navigate(`/filter`)
    } else {
      navigate(`/filter?sort=${sortname}&boolean=${trueName}`)
    }
  }, [navigate, sortname, trueName])

  useEffect(() => {
    TrueChangeHandler()
  }, [TrueChangeHandler])

  return (
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>
            <Select
              onChange={() => orderChangeHandler(sortName)}
              value={sortName}
            >
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
          <Th>
            <Select
              placeholder="주문번호"
              onChange={booleanNameHandler}
              value={trueName}
            >
              <option value="ALL">ALL</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </Select>
          </Th>
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
