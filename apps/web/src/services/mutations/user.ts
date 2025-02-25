// src/services/mutations/users.ts
import { gql } from '../generated'

export const CREATE_USER = gql(`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      avatarUrl
    }
  }
`)

export const UPDATE_USER = gql(`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`)

export const DELETE_USER = gql(`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`)