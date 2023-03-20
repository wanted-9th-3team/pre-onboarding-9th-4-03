import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react'
import { Ttable } from '../../Type'

interface ITableList {
  tableData: Ttable[]
}

function TableItem({ tableData }: ITableList) {
  return (
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th>
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
