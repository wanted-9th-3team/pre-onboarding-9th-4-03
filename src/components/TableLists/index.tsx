import { Td, Tr } from '@chakra-ui/react'

interface ITableListsProps {
  id: number
  status: boolean
  currency: string
  customerId: number
  customerName: string
  transactionTime: string
}

function TableLists({
  id,
  status,
  currency,
  customerId,
  customerName,
  transactionTime,
}: ITableListsProps) {
  return (
    <Tr>
      <Td style={{ textAlign: 'center' }}>{id}</Td>
      <Td>{transactionTime}</Td>
      <Td>{status ? 'true' : 'false'}</Td>
      <Td>{customerId}</Td>
      <Td>{customerName}</Td>
      <Td>{currency}</Td>
    </Tr>
  )
}

export default TableLists
