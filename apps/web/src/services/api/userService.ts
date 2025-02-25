// src/services/api/userService.ts
import type {
    CreateUserInput,
    CreateUserMutationResponse,
    DeleteUserMutationResponse,
    UpdateUserInput,
    UpdateUserMutationResponse,
    User,
    UserQueryByEmailResponse,
    UserQueryResponse
} from '@/types/user'
import { graphqlClient } from '../client'
import {
    CREATE_USER,
    DELETE_USER,
    UPDATE_USER
} from '../mutations/user'
import {
    GET_USERS,
    // GET_USER_BY_ID,
    GET_USER_BY_EMAIL
} from '../queries/user'

export class UserService {
    static async getAllUsers(): Promise<User[]> {
        try {
            const response = await graphqlClient.request<UserQueryResponse>(GET_USERS)
            return response.users
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }
    }

    static async checkUserExists(email: string): Promise<boolean> {
        try {
            const response = await graphqlClient.request<UserQueryByEmailResponse>(
                GET_USER_BY_EMAIL,
                { email }
            )
            return !!response.user
        } catch (error) {
            console.error('Error checking user existence:', error)
            return false
        }
    }

    static async createUser(input: CreateUserInput): Promise<User> {
        try {
            const response = await graphqlClient.request<CreateUserMutationResponse>(
                CREATE_USER,
                { input }
            )
            return response.createUser
        } catch (error) {
            console.error('Error creating user:', error)
            throw error
        }
    }

    static async updateUser(id: string, input: UpdateUserInput): Promise<User> {
        try {
            const response = await graphqlClient.request<UpdateUserMutationResponse>(
                UPDATE_USER,
                { id, input }
            )
            return response.updateUser
        } catch (error) {
            console.error('Error updating user:', error)
            throw error
        }
    }

    static async deleteUser(id: string): Promise<boolean> {
        try {
            const response = await graphqlClient.request<DeleteUserMutationResponse>(
                DELETE_USER,
                { id }
            )
            return response.deleteUser
        } catch (error) {
            console.error('Error deleting user:', error)
            throw error
        }
    }
}