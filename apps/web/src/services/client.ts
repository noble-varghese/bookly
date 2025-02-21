import {GraphQLClient} from 'graphql-request'

const endpoint = 'my-gql-endpoint'

export const graphqlClient = new GraphQLClient(endpoint, {
    headers: {
        'Authorization': `Bearer {token}`
    }
})