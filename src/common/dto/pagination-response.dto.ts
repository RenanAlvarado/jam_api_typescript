export interface PaginationResponseDTO {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponseDTO<T> {
  data: T[];
  pagination: PaginationResponseDTO;
}
