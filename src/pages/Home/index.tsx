import { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Table } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { BiSearch } from 'react-icons/bi'
import { GrPowerReset } from 'react-icons/gr'
import { useQuery } from 'react-query'
import getOrderList from '../../apis/getOrderList'
import { TOrderInfo } from '../../Type'

const HomeContainer = styled.div`
  box-sizing: border-box;
  padding: 20px 30px;

  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search_form {
      margin: 0 50px;
      display: flex;
      align-items: center;
      input {
        height: 22px;
        text-indent: 5px;
        border-radius: 5px;
        outline: none;
        border: 0.3px solid #dddddd;
      }
      button {
        background-color: transparent;
        border: none;
        font-size: 18px;
        cursor: pointer;
        :hover {
          color: blue;
        }
      }
      .search_btn {
        position: relative;
        right: 30px;
      }
      .reset_btn {
        position: relative;
        right: 28px;
      }
    }
  }
`

function Home() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchInput = useRef('')
  const [searchKeyWord, setSearchKeyWord] = useState<string>('')

  const query = useQuery('getOrderList', getOrderList, {
    refetchInterval: 5000,
  })

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: (a: TOrderInfo, b: TOrderInfo): boolean => {
        return a.id > b.id
      },
      sortDirections: ['descend'],
      align: 'center',
      defaultSortOrder: 'ascend',
    },
    {
      title: 'transaction_time',
      dataIndex: 'transaction_time',
      defaultSortOrder: 'descend',
      sorter: (a: TOrderInfo, b: TOrderInfo): boolean => {
        return new Date(a.transaction_time) > new Date(b.transaction_time)
      },
      sortDirections: ['descend'],
      align: 'center',
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
      align: 'center',
    },
    {
      title: 'customer_id',
      dataIndex: 'customer_id',
      align: 'center',
    },
    {
      title: 'customer_name',
      dataIndex: 'customer_name',
      align: 'center',
      filteredValue: [searchKeyWord],
      onFilter: (value: string, record: TOrderInfo): boolean => {
        return record.customer_name
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase())
      },
    },
    {
      title: 'currency',
      dataIndex: 'currency',
      align: 'center',
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

    if (location.search) {
      const queryString = location.search.slice(
        0,
        location.search.indexOf('search')
      )
      navigate(`/${queryString}search=${keyword}`)
    }
  }

  const onClickReset = e => {
    setSearchKeyWord('')
    searchInput.current.value = ''
    if (location.search) {
      const queryString = location.search.slice(
        0,
        location.search.indexOf('search')
      )
      navigate(`/${queryString}search=null`)
    }
  }

  return (
    <HomeContainer>
      <div className="menu">
        <h1>스위치온_기업과제</h1>
        <form className="search_form" onSubmit={onClickSearchBtn}>
          <label htmlFor="username" />
          <input
            id="username"
            type="text"
            ref={searchInput}
            placeholder="customer name"
          />
          <button type="submit" className="search_btn">
            <BiSearch />
          </button>
          <button type="button" className="reset_btn" onClick={onClickReset}>
            <GrPowerReset />
          </button>
        </form>
      </div>
      <Table
        columns={columns}
        dataSource={query.data}
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
