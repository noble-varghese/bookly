// src/services/api/userService.ts
import { Book, CreateBookMutationResponse, CreateBookInput, GetBooksQueryResponse } from '@/types/book'
import { graphqlClient } from '../client'
import {
    CREATE_BOOK
} from '../mutations/book'
import { GET_BOOKS } from '../queries/book'

export class BookService {
    static async createBook(input: CreateBookInput): Promise<Book> {
        try {
            const response = await graphqlClient.request<CreateBookMutationResponse>(CREATE_BOOK, {input})
            return response.book
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }
    }

    static async getBooks(page: number = 1, limit: number = 10): Promise<Book[]> {
        try {
            const response = await graphqlClient.request<GetBooksQueryResponse>(GET_BOOKS, {page, limit})
            return response.books
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }
    }
}