import { Table } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import getOrderList from '../../apis/getOrderList'
import { TOrderList } from '../../Type'

const HomeContainer = styled.div`
  box-sizing: border-box;
  padding: 20px 30px;
`

function Home() {
  const [orderList, setOrderList] = useState<TOrderList[] | null>()

  useEffect(() => {
    getOrderList().then(data => {
      setOrderList(data)
    })
  }, [])

  const columns: ColumnsType<TOrderList> = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: (a, b) => a - b,
      sortDirections: ['descend'],
    },
    {
      title: 'transaction_time',
      dataIndex: 'transaction_time',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a - b,
      sortDirections: ['descend'],
    },
    {
      title: 'status',
      dataIndex: 'status',
      filters: [
        {
          text: 'true',
          value: 'true',
        },
        {
          text: 'false',
          value: 'false',
        },
      ],
      onFilter: (value: string, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'customer_id',
      dataIndex: 'customer_id',
    },
    {
      title: 'customer_name',
      dataIndex: 'customer_name',
    },
    {
      title: 'currency',
      dataIndex: 'currency',
    },
  ]

  const onChange: TableProps<TOrderList>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <HomeContainer>
      <h1>스위치온_기업과제</h1>
      <Table
        columns={columns}
        dataSource={orderList}
        pagination={{ defaultPageSize: 50 }}
        onChange={onChange}
      />
    </HomeContainer>
  )
}

export default Home
