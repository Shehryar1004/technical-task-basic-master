import {useState, useEffect} from 'react'
import {useQuery,useMutation} from '@apollo/client'
import { LOAD_CITIES, LOAD_CUSTOMERS } from '../graphql/Queries'
import { INSERT_CUSTOMER } from '../graphql/Mutations'
import {
    Text,
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
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    Spinner
} from '@chakra-ui/react'


type PropsType = {
    isOpen: boolean
    onClose: () => void
}
type City = {
    id: number,
    name: string
}
function AddCustomerForm({isOpen, onClose}: PropsType){
    const [cities, setCities] = useState<City[]>([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [city, setCity] = useState(-1)

    const {error, loading, data} = useQuery(LOAD_CITIES)
    useEffect(() => {
        if (data)
            setCities(data.cities)
    }, [data])

    const [insertCustomer, { 
        data: insertionResult, 
        error:insertionError, 
        loading:insertionLoading 
    }] = useMutation(INSERT_CUSTOMER, { refetchQueries: [{query: LOAD_CUSTOMERS}]})
    
    const handleSubmit = () => {
        
        insertCustomer({
            variables: {
                name:name,
                email:email,
                role:role,
                city_id:city,
            }
        })

        if (insertionError){
             console.log("error", insertionError)
        }
    }
    useEffect(() => {
        handleClose()
    }, [insertionResult])

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
                <ModalHeader>Enter Customer Data</ModalHeader>
                <ModalCloseButton onClick={handleClose}/>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input 
                            type='text'
                            disabled={insertionLoading}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input 
                            type='email' 
                            disabled={insertionLoading}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Input 
                            type='text' 
                            disabled={insertionLoading}
                            value={role}
                            onChange={e => setRole(e.target.value)}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>City</FormLabel>
                        <Select 
                            placeholder='Select city' 
                            disabled={insertionLoading}
                            onChange={e => setCity(parseInt(e.target.value))}
                        >
                            {
                                cities.map((city:City) => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        colorScheme='blue' 
                        mr={3} 
                        minWidth={'28'}
                        onClick={handleSubmit} 
                        disabled={insertionLoading}
                    >
                        {insertionLoading ? <Spinner /> : <Text>Add Customer</Text>}
                    </Button>
                    <Button 
                        variant='ghost' 
                        onClick={handleClose} 
                        disabled={insertionLoading}
                    >
                        <Text>Cancel</Text>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddCustomerForm