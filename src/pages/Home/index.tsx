import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import getTableInfo from '../../apis/tableApi.ts'
import Pagination from '../../components/Pagination'
import SearchUserName from '../../components/SearchUserName'
import SortButtons from '../../components/SortButtons'
import Table from '../../components/Table'
import { ITableInfo } from '../../Type'

const Container = styled.div`
  display: flex;
`
function Home() {
  const { isLoading, data } = useQuery<ITableInfo[]>({
    queryKey: ['tableInfo'],
    queryFn: getTableInfo,
    refetchInterval: 5000,
  })
  console.log(data)
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
