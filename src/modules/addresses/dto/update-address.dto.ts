import * as Yup from "yup";
import normalizedString from "../../../utils/validators/normalized-string";

// Schema de validação para atualização de endereço
export const updateAddressSchema = Yup.object({
  // Nome do local
  place_name: normalizedString()
    .min(1, "O nome do local não pode ficar vazio.")
    .max(255, "O nome do local deve ter no máximo 255 caracteres.")
    .optional(),

  // Número do endereço
  number: normalizedString()
    .min(1, "O número do endereço não pode ficar vazio.")
    .optional(),

  // CEP
  zip_code: Yup.string()
    .transform((value) =>
      typeof value === "string" ? value.replace(/\D/g, "") : value,
    )
    .matches(/^\d{8}$/, "O CEP deve conter exatamente oito dígitos.")
    .optional(),

  // Complemento
  complement: normalizedString()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .optional()
    .max(255, "O complemento deve ter no máximo 255 caracteres."),
}).test(
  "at-least-one-field",
  "Informe pelo menos um campo para atualizar o endereço.",
  (value) =>
    value !== undefined &&
    Object.values(value).some((field) => field !== undefined),
);

export type UpdateAddressDTO = Yup.InferType<typeof updateAddressSchema>;
