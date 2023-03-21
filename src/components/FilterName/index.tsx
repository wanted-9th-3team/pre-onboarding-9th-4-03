import { Link, useSearchParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Input, Button } from '@chakra-ui/react'
import { NameData } from '../../atom/index'

function NameFilter() {
  const [name, setName] = useRecoilState(NameData)
  const [searchParams] = useSearchParams()

  const sortname = searchParams.get('sort')
  const trueName = searchParams.get('boolean')

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('name', name)
    setName(e.target.value)
  }

  return (
    <div>
      <Input
        size="sm"
        width="200px"
        variant="outline"
        value={name}
        onChange={nameHandler}
      />

      <Link to={`/filter?sort=${sortname}&status=${trueName}&name=${name}`}>
        <Button colorScheme="teal" type="button" size="sm">
          filter
        </Button>
      </Link>

      <Link to="/filter?sort=null&status=ALL">
        <Button colorScheme="orange" type="button" size="sm">
          reset
        </Button>
      </Link>
    </div>
  )
}

export default NameFilter
