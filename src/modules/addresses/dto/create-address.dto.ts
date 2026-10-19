import * as Yup from "yup";
import normalizedString from "../../../utils/validators/normalized-string";

// Schema de validação para criação de endereço
export const createAddressSchema = Yup.object({
  // Nome do local
  place_name: normalizedString()
    .required("O nome do local é obrigatório.")
    .max(255, "O nome do local deve ter no máximo 255 caracteres."),

  // Número do endereço
  number: normalizedString().required("O número do endereço é obrigatório."),

  // CEP
  zip_code: Yup.string()
    .transform((value) =>
      typeof value === "string" ? value.replace(/\D/g, "") : value,
    )
    .required("O CEP é obrigatório.")
    .matches(/^\d{8}$/, "O CEP deve conter exatamente oito dígitos."),

  // Complemento
  complement: normalizedString()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .optional()
    .max(255, "O complemento deve ter no máximo 255 caracteres."),
});

export type CreateAddressDTO = Yup.InferType<typeof createAddressSchema>;
