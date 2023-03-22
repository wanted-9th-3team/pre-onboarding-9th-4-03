import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { tableSettingsAtom, todayDataSelector } from '../../atoms'

const Container = styled.table`
  border: 1px solid #333;
`
const Td = styled.td`
  border: 1px solid #333;
`

export default function Table() {
  const todayDataRaw = useRecoilValue(todayDataSelector)
  const { searched, sortOption, statusFilter } =
    useRecoilValue(tableSettingsAtom)

  const filteredTodayData = todayDataRaw
    ?.filter(el => {
      if (searched === '') {
        return true
      }
      if (el.customer_name.includes(searched)) {
        return true
      }
      return false
    })
    .filter(el => {
      // status로
      if (statusFilter) {
        if (el.status) {
          return true
        }
        return false
      }
      return true
    })

  if (sortOption === '주문번호') {
    filteredTodayData.sort((a, b) => {
      if (a.id > b.id) {
        return -1
      }
      if (a.id < b.id) {
        return 1
      }
      return 0
    })
  } else if (sortOption === '거래시간') {
    filteredTodayData.sort((a, b) => {
      const dateA = new Date(a.transaction_time)
      const dateB = new Date(b.transaction_time)
      const timeA = dateA.getTime()
      const timeB = dateB.getTime()
      if (timeA < timeB) {
        return 1
      }
      if (timeA > timeB) {
        return -1
      }
      return 0
    })
  }

  return (
    <Container>
      <thead>
        <tr>
          <th>id</th>
          <th>customer ID</th>
          <th>customer name</th>
          <th>currency</th>
          <th>transaction time</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        {filteredTodayData.map(el => (
          <tr key={el.id}>
            <Td>{el.id}</Td>
            <Td>{el.customer_id}</Td>
            <Td>{el.customer_name}</Td>
            <Td>{el.currency}</Td>
            <Td>{el.transaction_time}</Td>
            <Td>{el.status ? 'true' : 'false'}</Td>
          </tr>
        ))}
      </tbody>
    </Container>
  )
}
