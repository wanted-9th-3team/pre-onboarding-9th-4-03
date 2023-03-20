import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './App.css'
import getTableInfo from './apis/TableApi.ts'
import { ContentData } from './atom'
import { Ttable } from './Type'

function App() {
  const [tableData, setTableData] = useRecoilState(ContentData)

  const dataHandler = async () => {
    const response: Ttable[] = await getTableInfo()
    const filteredRes = response.filter(
      el => el.transaction_time.split(' ')[0] === '2023-03-08'
    )
    setTableData(filteredRes)
    return response
  }
  useEffect(() => {
    dataHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(tableData)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/:name" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
