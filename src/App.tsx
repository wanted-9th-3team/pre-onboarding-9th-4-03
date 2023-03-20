import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './App.css'
import useGetTableQuery from './hooks/queries/useGetTableQuery'
import { useAppDispatch } from './store'
import { setTableLists } from './store/table/tableSlice'

function App() {
  const dispatch = useAppDispatch()
  const { useGetAllTableDataQuery } = useGetTableQuery()
  const { data: tableLists } = useGetAllTableDataQuery()

  useEffect(() => {
    if (tableLists) dispatch(setTableLists(tableLists))
  }, [tableLists, dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
