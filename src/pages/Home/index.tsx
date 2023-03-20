import { Box, Center } from '@chakra-ui/react'
import TableControl from '../../components/TableControl'
import TableView from '../../components/TableView'

function Home() {
  return (
    <>
      <Box h="calc(10vh - 20px)" display="flex" justifyContent="space-between">
        <TableControl />
      </Box>
      <Center w="100%">
        <TableView />
      </Center>
    </>
  )
}
export default Home
