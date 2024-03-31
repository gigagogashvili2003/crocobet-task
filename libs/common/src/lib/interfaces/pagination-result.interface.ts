import { IPageInfo } from './pagination-page.interface';

export interface PaginationResult<T> {
    items: T[];
    pageInfo: IPageInfo;
}
