import { useQuery } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import getTableInfo from '../../apis/tableApi.ts'
import { allFetchedDataAtom } from '../../atoms'
import Pagination from '../../components/Pagen/index'
import Filter from '../../components/Filter'
import SortButtons from '../../components/SortButtons'
import Table from '../../components/Table'
import { IData } from '../../Type'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const TableSettings = styled.div`
  display: flex;
  justify-content: space-between;
`
function Home() {
  const { data } = useQuery<IData[]>(['tableInfo'], getTableInfo, {
    refetchInterval: 5000,
  })
  const SetRecoilState = useSetRecoilState(allFetchedDataAtom)

  if (data) SetRecoilState(data)
  return (
    <>
      <h1>표: 3월 8일</h1>
      <Container>
        <TableSettings>
          <Filter></Filter>
          <SortButtons></SortButtons>
        </TableSettings>
        <Table></Table>
        <Pagination></Pagination>
      </Container>
    </>
  )
}

export default Home
