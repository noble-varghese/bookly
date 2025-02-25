import {GraphQLClient} from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || ''

export const graphqlClient = new GraphQLClient(endpoint, {
    headers: {
        'Authorization': `Bearer {token}`
    }
})

export const setAuthToken = (token: string) => {
    graphqlClient.setHeader('Authorization', `Bearer ${token}`)
  }
  
  // Helper to remove auth token
  export const removeAuthToken = () => {
    graphqlClient.setHeader('Authorization', '')
  }