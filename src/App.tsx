import {useState} from 'react';
import { Flex, Heading, Stack,Text, Button, useDisclosure } from '@chakra-ui/react';
import DataTable from './DataTable';
import AddCustomerForm from './components/AddCustomerForm';

function App() {
  const {isOpen, onClose, onOpen} = useDisclosure()

  return (
    <Flex align={"center"} bg="gray.200" justify="center" w={"100vw"} h="100vh">
      <Stack p="5%" bg="gray.300" rounded={"10px"}> 
        <DataTable />
        <Button onClick= {onOpen}>Add Record</Button>
        <AddCustomerForm 
          isOpen={isOpen}
          onClose={onClose}
        />
      </Stack>
    </Flex>
  );
}

export default App;
