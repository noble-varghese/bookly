// src/services/mutations/users.ts
import { gql } from '../generated'

export const CREATE_BOOK = gql(`
  mutation CreateBook($input: CreateBookInput!) {
    createBook(input: $input) {
      id
      title
      description
      publishedDate
      author {
        id
        name
      }
    }
  }
`)