import { Container, Box, Center } from '@chakra-ui/react'
import FilterName from '../../components/FilterName'
import PrePagination from '../../components/prePagination'

function Home() {
  return (
    <Container height="700px" maxW="800px" mt={5}>
      <FilterName />
      <Box mt={5} border="1px" borderColor="gray.200">
        <PrePagination />
      </Box>
    </Container>
  )
}

export default Home
