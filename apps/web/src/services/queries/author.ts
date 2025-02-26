// src/services/queries/users.ts
import { gql } from '../generated'

export const GET_AUTHORS = gql(`
  query GetAuthors($page: Int!, $limit: Int!) {
    authors(page: $page, limit: $limit) {
        id
        biography
        name
        books {
            id
            title
        }
        avatarUrl
        biography
    }
  }
`)
