import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

interface SearchParams {
  [key: string]: string
}

function useUrlSearch() {
  const [urlTerm, serUrlTerm] = useSearchParams()

  const setSearchParams = useCallback(
    (setParams: SearchParams) => {
      serUrlTerm(urlTerm)
      Object.keys(setParams).forEach(key => {
        urlTerm.set(key, setParams[key])
        serUrlTerm(urlTerm)
      })
    },
    [urlTerm, serUrlTerm]
  )

  const getSearchParams = useCallback(
    (searchParam: string) => {
      return urlTerm.get(searchParam)
    },
    [urlTerm]
  )

  const getAllSearchParams = useCallback(() => {
    const currentParams = [...urlTerm.entries()]

    return Object.fromEntries(currentParams)
  }, [urlTerm])

  const resetSearchParams = useCallback(() => {
    urlTerm.delete('sort')

    setSearchParams({ query: '', status: 'all', page: '1' })
  }, [urlTerm, setSearchParams])

  return {
    setSearchParams,
    getSearchParams,
    resetSearchParams,
    getAllSearchParams,
  }
}

export default useUrlSearch
