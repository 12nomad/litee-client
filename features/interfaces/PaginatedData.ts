export interface PaginatedData<T> {
  currentPage: number;
  data: T;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
