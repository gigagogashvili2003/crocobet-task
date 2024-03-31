import { PaginationProps, PaginationQueryDto, PaginationResult, QueryResult } from '@app/common';

export class PaginationService<T> {
    protected paginate(
        queryResult: QueryResult<T>,
        pagination: PaginationQueryDto & { currentPage: number },
    ): PaginationResult<T> {
        const { items, totalCount } = queryResult;
        const { pageSize, currentPage } = pagination;
        const totalPages = Math.ceil(totalCount / pageSize);
        const remainingCount = totalCount - pageSize * currentPage;

        return {
            items: items,
            pageInfo: {
                currentPage,
                hasNextPage: remainingCount > 0,
                hasPreviousPage: currentPage === 1 ? false : true,
                remainingCount: remainingCount < 1 ? 0 : remainingCount,
                totalCount,
                totalPages,
            },
        };
    }

    protected getPaginationProps = ({ page, pageSize }: PaginationQueryDto): PaginationProps => {
        return { take: pageSize, skip: page === 1 ? 0 : (page - 1) * pageSize };
    };
}
