import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Table } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { BiSearch } from 'react-icons/bi'
import { GrPowerReset } from 'react-icons/gr'
import getOrderList from '../../apis/getOrderList'
import { TOrderInfo } from '../../Type'

const HomeContainer = styled.div`
  box-sizing: border-box;
  padding: 20px 30px;
`

function Home() {
  const navigate = useNavigate()
  const location = useLocation()
  const [orderList, setOrderList] = useState<TOrderInfo[] | null>()
  const [searchKeyWord, setSearchKeyWord] = useState<string>()

  useEffect(() => {
    getOrderList().then(data => {
      setOrderList(data)
    })
  }, [])

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: (a: TOrderInfo, b: TOrderInfo): boolean => {
        return a.id > b.id
      },
      sortDirections: ['descend'],
    },
    {
      title: 'transaction_time',
      dataIndex: 'transaction_time',
      defaultSortOrder: 'descend',
      sorter: (a: TOrderInfo, b: TOrderInfo): boolean => {
        return new Date(a.transaction_time) > new Date(b.transaction_time)
      },
      sortDirections: ['descend'],
    },
    {
      title: 'status',
      dataIndex: 'status',
      render: (text: boolean, record: TOrderInfo, index: number): string => {
        return text ? '완료' : '처리중'
      },
      filters: [
        {
          text: '완료',
          value: 'true',
        },
        {
          text: '처리중',
          value: 'false',
        },
      ],
      onFilter: (value: string, record: TOrderInfo): boolean => {
        return !!value === record.status
      },
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

  const onChange = (pagination, filters, sorter, extra): void => {
    // console.log('params', pagination, filters, sorter, extra)
    const idSort = sorter.field === 'id' ? sorter.order : undefined
    const timeSort =
      sorter.field === 'transaction_time' ? sorter.order : undefined
    navigate(
      `/?page=${pagination.current}&id_sort=${idSort}&time_sort=${timeSort}&status=${filters.status}&search=${searchKeyWord}`
    )
  }

  const onClickSearchBtn = e => {
    e.preventDefault()
    const keyword = e.target.username.value

    if (!keyword) {
      // eslint-disable-next-line no-alert
      alert('검색하고자하는 고객이름을 입력해주세요.')
    }

    setSearchKeyWord(keyword)
    const queryString = location.search.slice(
      0,
      location.search.indexOf('search')
    )
    navigate(`${queryString}search=${keyword}`)
  }

  return (
    <HomeContainer>
      <h1>스위치온_기업과제</h1>
      <form className="search_input" onSubmit={onClickSearchBtn}>
        <label htmlFor="username" />
        <input id="username" type="text" placeholder="customer name" />
        <button type="submit">
          <BiSearch />
        </button>
        <span>
          <GrPowerReset />
        </span>
      </form>
      <Table
        columns={columns}
        dataSource={orderList}
        pagination={{
          defaultPageSize: 50,
          showSizeChanger: false,
        }}
        onChange={onChange}
      />
    </HomeContainer>
  )
}

export default Home
