import { gql } from "@apollo/client";

export const INSERT_CUSTOMER = gql`
    mutation insertCustomer(
        $name: String, 
        $email: String, 
        $role: String, 
        $city_id: Int
    ) {
        insert_customers_one(object: {
            name: $name, 
            email: $email,
            role: $role,
            city_id: $city_id
        }) {
            id
        }
    }
`

export const DELETE_CUSTOMER = gql`
    mutation deleteCustomer($id: Int!){
        delete_customers_by_pk(id: $id){
            id
        }
    }
`

export const EDIT_CUSTOMER = gql`
    mutation editCustomer(
        $id: Int!,
        $name: String,
        $email: String,
        $role: String,
        $city_id: Int
    ) {
        update_customers_by_pk( pk_columns: {id: $id}, _set: {
            id: $id,
            name: $name,
            email: $email,
            role: $role,
            city_id: $city_id
        }){
            id
        }
    }
`