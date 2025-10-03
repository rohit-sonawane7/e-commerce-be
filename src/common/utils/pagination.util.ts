export interface PaginationOptions {
    skip: number;
    take: number;
}

export interface PaginationMeta {
    total: number;
    skip: number;
    pageSize: number;
    take: number;
    last_page: number;
}

export interface PaginatedResult<T> {
    data: T[];
    meta: PaginationMeta;
}

export function buildPagination<T>(
    data: T[],
    total: number,
    options: PaginationOptions,
): PaginatedResult<T> {
    const { skip, take } = options;

    return {
        data,
        meta: {
            total,
            skip,
            pageSize: data.length,
            take,
            last_page: Math.ceil(total / take),
        },
    };
}
