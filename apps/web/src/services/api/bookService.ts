// src/services/api/userService.ts
import { CreateBookInput, DeleteBookInput, EditBookInput } from '@/types/book';
import { Book, GetBooksQueryResponse } from '@/types/book';
import { graphqlClient } from '../client';
import {
    CREATE_BOOK,
    DELETE_BOOK,
    UPDATE_BOOK
} from '../mutations/book';
import { GET_BOOKS } from '../queries/book';

export class BookService {
    static async createBook(input: CreateBookInput): Promise<Book> {
        try {
            const response = await graphqlClient.request<{ createBook: Book }>(CREATE_BOOK, { input });
            return response.createBook;
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }
    }

    static async updateBook(bookId: string, input: EditBookInput): Promise<Book> {
        try {
            console.log(bookId)
            console.log(input)
            const response = await graphqlClient.request<{updateBook: Book}>(UPDATE_BOOK, { id: bookId, input })
            return response.updateBook
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }
    }

    static async getBooks(page: number = 1, limit: number = 10): Promise<Book[]> {
        try {
            const response = await graphqlClient.request<GetBooksQueryResponse>(GET_BOOKS, { page, limit })
            return response.books
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }
    }

    static async deleteBook(input: DeleteBookInput): Promise<boolean> {
        try {
            await graphqlClient.request<{deleteBook: boolean}>(DELETE_BOOK, { id: input.bookId })
            return true
        } catch(error) {
            console.error('Error deleting the book!')
            throw error
        }
    }
}