import * as Yup from "yup";

export const searchParamsSchema = Yup.object({
  page: Yup.number()
    .typeError("A página deve ser um número.")
    .integer("A página deve ser um número inteiro.")
    .min(1, "A página mínima é 1.")
    .default(1),

  limit: Yup.number()
    .typeError("O limite deve ser um número.")
    .integer("O limite deve ser um número inteiro.")
    .min(1, "O limite mínimo é 1.")
    .max(100, "O limite máximo é 100.")
    .default(10),

  order: Yup.string()
    .oneOf(["ASC", "DESC"], "A ordenação deve ser ASC ou DESC.")
    .transform((value) =>
      typeof value === "string" ? value.toUpperCase() : value,
    )
    .default("ASC"),
});

export type SearchParamsDTO = Yup.InferType<typeof searchParamsSchema>;
