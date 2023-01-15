import {useState} from 'react'
import {useQuery} from '@apollo/client'
import { LOAD_CUSTOMERS } from './graphql/Queries'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Spinner,
} from '@chakra-ui/react'
import DeleteConfirmationDialog from './components/DeleteCustomerDialog'
import EditCustomerForm from './components/EditCustomerForm'

type Customer = {
    id: number
    name: string
    email: string
    role: string
    city: number | string
}

function DataTable() {
    const [deletingRecord, setDeletingRecord] = useState(-1)
    const [editingRecord, setEditingRecord] = useState(-1)
    const { error, loading, data } = useQuery(LOAD_CUSTOMERS)

    function editRecord(customerId: number) {
        setEditingRecord(customerId)
    }

    function deleteRecord(customerId: number) {
        setDeletingRecord(customerId)
    }


    return(
        <>
            <TableContainer style={{backgroundColor: '#efefef'}}>
                <Table colorScheme={'orange'}>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>City Name</Th>
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    
                    
                    {
                        loading 
                        ? <Spinner />
                        : 
                        <Tbody>
                            {data.customers.map((customer:any) => (
                                <Tr key={customer.id}>
                                    <Td>{customer.name}</Td>
                                    <Td>{customer.email}</Td>
                                    <Td>{customer.role}</Td>
                                    <Td>{customer.city.name}</Td>
                                    <Td>
                                        <Button
                                            onClick={() => editRecord(customer.id)}
                                        >Edit</Button>
                                    </Td>
                                    <Td>
                                        <Button 
                                            colorScheme={'red'}
                                            onClick={() => deleteRecord(customer.id)}
                                        >Delete</Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    }
                </Table>
            </TableContainer>
            <DeleteConfirmationDialog
                isOpen={deletingRecord != -1} 
                recordId={deletingRecord}
                onClose={() => setDeletingRecord(-1)} 
            />
            <EditCustomerForm 
                isOpen={editingRecord != -1}
                customer={data?.customers.find((customer:Customer) => customer.id == editingRecord)}
                onClose={() => setEditingRecord(-1)}
            />
        </>
    )
}

export default DataTable