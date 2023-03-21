import { useQuery } from '@tanstack/react-query'
import getDataTable from '../../apis/TableApi.ts'

function useGetTableQuery() {
  const useGetAllTableDataQuery = () => {
    return useQuery({
      queryKey: ['Table'],
      queryFn: getDataTable,
      select: datas =>
        datas?.filter(data => {
          const date = data.transaction_time.split(' ')[0]
          return date.split('-')[2] === '08'
        }),
      refetchInterval: 5000,
    })
  }

  return {
    useGetAllTableDataQuery,
  }
}

export default useGetTableQuery
