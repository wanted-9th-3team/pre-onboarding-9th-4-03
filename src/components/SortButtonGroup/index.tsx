import { Button, ButtonGroup } from '@chakra-ui/react'

function TradeTableItem(props: {
  setSortBy: React.Dispatch<React.SetStateAction<string>>
}) {
  const { setSortBy } = props

  const sortButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSortBy(e.currentTarget.value)
  }

  return (
    <ButtonGroup>
      <Button value="주문번호" onClick={sortButtonClickHandler}>
        주문번호
      </Button>
      <Button value="거래시간" onClick={sortButtonClickHandler}>
        거래일 & 거래시간
      </Button>
      <Button value="기본" onClick={sortButtonClickHandler}>
        초기화
      </Button>
    </ButtonGroup>
  )
}

export default TradeTableItem
