export interface User {
    id: string
    name: string
    email: string
}

export interface CreateUserInput {
    name: string
    email: string
    avatarUrl: string
}

export interface UpdateUserInput {
    name?: string
    email?: string
}

export interface UserQueryResponse {
    users: User[]
}

export interface UserQueryByEmailResponse {
    user: User
}

export interface UserByIdQueryResponse {
    user: User | null
}

export interface CreateUserMutationResponse {
    createUser: User
}

export interface UpdateUserMutationResponse {
    updateUser: User
}

export interface DeleteUserMutationResponse {
    deleteUser: boolean
}