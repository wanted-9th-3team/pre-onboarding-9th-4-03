import React from 'react'
import getOrderInfo from '../../apis/TableApi'

interface IOrderData {
  id: number
  transaction_time: string
  status: boolean
  customer_id: number
  customer_name: string
  currency: string
}

function Home() {
  const [orderDataBase, setOrderDataBase] = React.useState<IOrderData[]>([])

  const getDataBase = async () => {
    const data = await getOrderInfo()
    if (data) {
      setOrderDataBase(
        data.filter((DataItem: IOrderData) => {
          const DateData = new Date(DataItem.transaction_time)
          return (
            DateData.getFullYear() === 2023 &&
            DateData.getDate() === 8 &&
            DateData.getMonth() === 2
          )
        })
      )
    }
  }

  React.useEffect(() => {
    getDataBase()
  }, [])

  return <h1>Hello World</h1>
}

export default Home
