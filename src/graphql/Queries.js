import { gql } from "@apollo/client";

export const LOAD_CUSTOMERS = gql`
    query getCustomers {
        customers {
            email
            id
            name
            role
            city {
                id
                name
            }
        }
    }
`

export const LOAD_CITIES = gql`
    query getCities {
        cities {
            id
            name
        }
    }
`