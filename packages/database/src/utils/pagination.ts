export interface PaginationOptions {
    page?: number;
    limit?: number;
}

export interface IGetPaginationOptions {
    offset: number,
    limit: number
}

export const getPaginationOptions = (options: PaginationOptions): IGetPaginationOptions => {
    const page = options.page || 1
    const limit = options.limit || 10

    return {
        offset: (page-1) * limit,
        limit
    }
}