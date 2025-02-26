import { Author } from "@/services/generated/graphql"


export interface Book {
    id: string
    title: string
    description: string
    publishedDate: Date
    author: Author
    createdAt: Date
    updatedAt: Date
}

export interface CreateBookInput {
    title: string
    description: string
    publishedDate: string
    authorId: string
    coverUrl: string
    coverImage?: File | null
}

export interface EditBookInput {
    title: string
    description: string
    publishedDate: string
    authorId: string
    coverUrl: string
    coverImage?: File | null
}

export interface DeleteBookInput {
    bookId: string
}

export interface CreateBookMutationResponse {
    book: Book
}

export interface GetBooksQueryResponse {
    books: Book[]
}