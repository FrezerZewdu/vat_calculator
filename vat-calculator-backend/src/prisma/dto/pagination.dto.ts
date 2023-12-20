export class PaginatedOutputDto<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}
export class PaginationInfoDto {
  page: number;
  perPage: number;
}
