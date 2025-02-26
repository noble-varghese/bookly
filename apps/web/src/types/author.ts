export interface Author {
    id: string
    name: string
    biography: string
    bornDate: Date
    createdAt: Date
    updatedAt: Date
    avatarUrl: string
}

export interface CreateAuthorInput {
    name: string;
    bio: string;
    bornDate: string;
    avatarUrl: string;
    avatarImage: File | null
}


export interface DeleteAuthorInput {
    authorId: string
}