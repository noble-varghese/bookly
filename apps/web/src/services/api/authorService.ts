// src/services/api/userService.ts
import { DeleteBookInput } from '@/types/book';
import { graphqlClient } from '../client';
import { Author, CreateAuthorInput, UpdateAuthorInput } from '../generated/graphql';
import { CREATE_AUTHOR, DELETE_AUTHOR, UPDATE_AUTHOR } from '../mutations/author';
import { GET_AUTHORS } from '../queries/author';
import { DeleteAuthorInput } from '@/types/author';

export class AuthorService {
    static async createAuthor(input: CreateAuthorInput): Promise<Author> {
        try {
            const response = await graphqlClient.request<{ createAuthor: Author }>(CREATE_AUTHOR, { input });
            return response.createAuthor;
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }
    }

    static async getAuthors(page: number = 1, limit: number = 10): Promise<Author[]>{
        try {
            const response = await graphqlClient.request<{ authors: Author[] }>(GET_AUTHORS, { page, limit });
            return response.authors;
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }
    }

    static async deleteAuthor(input: DeleteAuthorInput): Promise<boolean> {
        try {
            const response = await graphqlClient.request<{deleteAuthor: boolean }>(DELETE_AUTHOR, { id: input.authorId })
            return response.deleteAuthor
        } catch(error) {
            console.error('Error deleting the book!')
            throw error
        }
    }

    static async updateAuthor(id:string, input: UpdateAuthorInput): Promise<Author> {
        try {
            console.log(input)

            const response = await graphqlClient.request<{ updateAuthor: Author }>(UPDATE_AUTHOR, { id, input });
            return response.updateAuthor;
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }
    }
}