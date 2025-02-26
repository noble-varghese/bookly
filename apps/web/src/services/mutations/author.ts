// src/services/mutations/users.ts
import { gql } from '../generated'

export const CREATE_AUTHOR = gql(`
  mutation CreateAuthor($input: CreateAuthorInput!) {
    createAuthor(input: $input) {
      id
      name
      biography
      avatarUrl
    }
  }
`)


export const DELETE_AUTHOR = gql(`
    mutation DeleteAuthor($id: ID!) {
        deleteAuthor(id: $id)
    }
`)