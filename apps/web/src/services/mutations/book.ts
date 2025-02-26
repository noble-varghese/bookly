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
      coverUrl
    }
  }

`)

export const UPDATE_BOOK = gql(`
  mutation UpdateBook($id: ID!, $input: UpdateBookInput!) {
    updateBook(id: $id, input: $input) {
      id
      title
      description
      publishedDate
      coverUrl
      author {
        id
        name
      }
    }
  }
`)

export const DELETE_BOOK = gql(`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`)