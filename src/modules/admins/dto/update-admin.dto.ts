import * as Yup from "yup";
import normalizedString from "../../../utils/validators/normalized-string";
import strongPassword from "../../../utils/validators/strong-password";

// Schema de validação para atualização de administrador
export const updateAdminSchema = Yup.object({
  // Nome
  name: normalizedString()
    .min(1, "O nome não pode ficar vazio.")
    .max(100, "O nome deve ter no máximo 100 caracteres.")
    .optional(),

  // Senha
  password: strongPassword().optional(),
}).test(
  "at-least-one-field",
  "Informe pelo menos um campo para atualizar o administrador.",
  (value) =>
    value !== undefined &&
    Object.values(value).some((field) => field !== undefined),
);

export type UpdateAdminDTO = Yup.InferType<typeof updateAdminSchema>;
