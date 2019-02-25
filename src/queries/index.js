import {gql} from "apollo-boost";

export const GET_ALL_USERS = gql`
    query {
        users {
            id
            name
            email
        }
    }
`;

export const ME = gql`
    query {
        me {
            id
            name
            email
        }
    }
`;


// MUTATIONS
export const LOGIN = gql`
    mutation($email: String!, $password: String!){
        login(data:{email: $email, password: $password}) {
            token
            user {
                id
                name
                email
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation($name: String!,$email: String!, $password: String!){
        createUser(data:{name: $name, email: $email, password: $password}) {
            token
            user {
                id
                name
                email
            }
        }
    }
`;


