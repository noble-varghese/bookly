// src/services/queries/users.ts
import { gql } from '../generated'

export const GET_BOOKS = gql(`
  query GetBooks($page: Int!, $limit: Int!) {
    books(page: $page, limit: $limit) {
      id
      title
      description
      author {
        name
      }
      coverUrl
    }
  }
`)


export const GET_BOOKS_BY_AUTHOR = gql(`
  query GetBooksByAuthor($authorId: ID!) {
    getBooksByAuthor(authorId: $authorId) {
      id
      title
      description
      author {
        name
      }
      coverUrl
    }
  }
`)
