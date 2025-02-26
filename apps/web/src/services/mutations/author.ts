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


export const UPDATE_AUTHOR = gql(`
  mutation UpdateAuthor($id: ID!, $input: UpdateAuthorInput!) {
    updateAuthor(id: $id, input: $input) {
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