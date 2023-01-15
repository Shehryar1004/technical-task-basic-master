import {useEffect, useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import { EDIT_CUSTOMER } from '../graphql/Mutations'
import { LOAD_CITIES, LOAD_CUSTOMERS } from '../graphql/Queries'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Select,
    Spinner
} from '@chakra-ui/react'

type City = {
    id: number,
    name: string
}
type Customer = {
    id: number
    name: string
    email: string
    role: string
    city: City
}
type PropsType = {
    isOpen: boolean
    onClose: () => void
    customer: Customer
}

function EditCustomerForm({isOpen, onClose, customer}: PropsType){
    const {error, loading, data} = useQuery(LOAD_CITIES)
    const [editCustomer, {
        error: editError,
        loading: editLoading,
        data: editData
    }] = useMutation(EDIT_CUSTOMER, {refetchQueries: [{query: LOAD_CUSTOMERS}]})

    const [cities, setCities] = useState([])
    const [name, setName] = useState(customer?.name)
    const [email, setEmail] = useState(customer?.email)
    const [role, setRole] = useState(customer?.role)
    const [city, setCity] = useState(customer?.city.id)

    useEffect(() => {
        if (customer == null)
            return
        setName(customer.name)
        setEmail(customer.email)
        setRole(customer.role)
        setCity(customer.city.id)
    }, [customer])

    useEffect(() => {
        setCities(data?.cities)
    }, [data])

    useEffect(() => {
        handleClose()
    }, [editData])

    function handleSubmit(){

        editCustomer({
            variables: {
                id: customer.id,
                name: name,
                email: email,
                role: role,
                city_id: city
            }
        })
    }

    function handleClose(){
        setName('')
        setEmail('')
        setRole('')
        setCity(-1)
        onClose()
    }


    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Customer Data</ModalHeader>
                <ModalCloseButton onClick={handleClose}/>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input 
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input 
                            type='email' 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Input 
                            type='text' 
                            value={role}
                            onChange={e => setRole(e.target.value)}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>City</FormLabel>
                        <Select 
                            placeholder='Select city' 
                            value={city}
                            onChange={e => setCity(parseInt(e.target.value))}
                        >
                            {cities?.map((city:City) => (
                                <option 
                                    key={city.id} 
                                    value={city.id}
                                >
                                    {city.name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                        {editLoading ? <Spinner /> : 'Edit Customer'}
                    </Button>
                    <Button variant='ghost' onClick={handleClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditCustomerForm