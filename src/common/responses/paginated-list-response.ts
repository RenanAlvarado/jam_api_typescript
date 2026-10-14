import type { Response } from "express";
import type { PaginationResponseDTO } from "../dto/pagination-response.dto";

export function sendPaginatedListResponse<T>(
  res: Response,
  data: T[],
  pagination: PaginationResponseDTO,
  message = "Registros listados com sucesso.",
) {
  return res.status(200).json({
    status: "success",
    message,
    data,
    pagination,
  });
}
