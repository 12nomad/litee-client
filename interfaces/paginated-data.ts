export interface PaginatedData<T, V> {
  currentPage: number;
  data: T;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  extra: V | null;
}
