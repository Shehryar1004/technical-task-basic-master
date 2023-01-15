import { useEffect } from "react"
import {
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text
} from '@chakra-ui/react'
import { useMutation } from "@apollo/client"
import { DELETE_CUSTOMER } from "../graphql/Mutations"
import { LOAD_CUSTOMERS } from "../graphql/Queries"

type DialogProps = {
    isOpen: boolean
    recordId: number,
    onClose: () => void 
}
function DeleteConfirmationDialog({isOpen, recordId, onClose}: DialogProps) {
    const [deleteCustomer, {
        error,
        loading, 
        data
    }] = useMutation(DELETE_CUSTOMER, {refetchQueries: [{query: LOAD_CUSTOMERS}]})
    const handleDelete = () => {
        deleteCustomer({
            variables: {
                id: recordId
            }
        })
    }
    useEffect(() => {
        onClose()
    }, [data])

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Are you sure you want to delete customer of id {recordId}?</Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleDelete}>
                        {loading ? <Spinner /> : <Text>Delete</Text>}
                    </Button>
                    <Button variant='ghost' onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteConfirmationDialog