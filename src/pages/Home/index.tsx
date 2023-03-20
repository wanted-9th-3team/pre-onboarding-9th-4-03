import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import getTableInfo from '../../apis/tableApi.ts'
import Pagination from '../../components/Pagination'
import SearchUserName from '../../components/SearchUserName'
import SortButtons from '../../components/SortButtons'
import Table from '../../components/Table'
import { IData, ITableInfo } from '../../Type'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
function Home() {
  const { isLoading, data } = useQuery<IData[]>(['tableInfo'], getTableInfo, {
    refetchInterval: 5000,
  })
  return (
    <>
      <h1>3월 8일도 열정 열정 열정</h1>
      <Container>
        <SearchUserName></SearchUserName>
        <SortButtons></SortButtons>
        <Table></Table>
        <Pagination></Pagination>
      </Container>
    </>
  )
}

export default Home
