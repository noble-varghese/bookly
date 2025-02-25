// src/services/queries/users.ts
import { gql } from '../generated'

export const GET_USERS = gql(`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`)

export const GET_USER_BY_EMAIL = gql(/* GraphQL */ `
    query GetUserByEmail($email: String!) {
      user(email: $email) {
        id
        name
        email
      }
    }
  `)