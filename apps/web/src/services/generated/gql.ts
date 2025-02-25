/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateBook($input: CreateBookInput!) {\n    createBook(input: $input) {\n      id\n      title\n      description\n      publishedDate\n      author {\n        id\n        name\n      }\n    }\n  }\n": typeof types.CreateBookDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      name\n      email\n      avatarUrl\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n      name\n      email\n    }\n  }\n": typeof types.UpdateUserDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n": typeof types.DeleteUserDocument,
    "\n  query GetBooks($page: Int!, $limit: Int!) {\n    books(page: $page, limit: $limit) {\n      id\n      title\n      description\n      author {\n        name\n      }\n      coverUrl\n    }\n  }\n": typeof types.GetBooksDocument,
    "\n  query GetUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n": typeof types.GetUsersDocument,
    "\n    query GetUserByEmail($email: String!) {\n      user(email: $email) {\n        id\n        name\n        email\n      }\n    }\n  ": typeof types.GetUserByEmailDocument,
};
const documents: Documents = {
    "\n  mutation CreateBook($input: CreateBookInput!) {\n    createBook(input: $input) {\n      id\n      title\n      description\n      publishedDate\n      author {\n        id\n        name\n      }\n    }\n  }\n": types.CreateBookDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      name\n      email\n      avatarUrl\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n      name\n      email\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n": types.DeleteUserDocument,
    "\n  query GetBooks($page: Int!, $limit: Int!) {\n    books(page: $page, limit: $limit) {\n      id\n      title\n      description\n      author {\n        name\n      }\n      coverUrl\n    }\n  }\n": types.GetBooksDocument,
    "\n  query GetUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n": types.GetUsersDocument,
    "\n    query GetUserByEmail($email: String!) {\n      user(email: $email) {\n        id\n        name\n        email\n      }\n    }\n  ": types.GetUserByEmailDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateBook($input: CreateBookInput!) {\n    createBook(input: $input) {\n      id\n      title\n      description\n      publishedDate\n      author {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBook($input: CreateBookInput!) {\n    createBook(input: $input) {\n      id\n      title\n      description\n      publishedDate\n      author {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      name\n      email\n      avatarUrl\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      name\n      email\n      avatarUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n      name\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBooks($page: Int!, $limit: Int!) {\n    books(page: $page, limit: $limit) {\n      id\n      title\n      description\n      author {\n        name\n      }\n      coverUrl\n    }\n  }\n"): (typeof documents)["\n  query GetBooks($page: Int!, $limit: Int!) {\n    books(page: $page, limit: $limit) {\n      id\n      title\n      description\n      author {\n        name\n      }\n      coverUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetUserByEmail($email: String!) {\n      user(email: $email) {\n        id\n        name\n        email\n      }\n    }\n  "): (typeof documents)["\n    query GetUserByEmail($email: String!) {\n      user(email: $email) {\n        id\n        name\n        email\n      }\n    }\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;