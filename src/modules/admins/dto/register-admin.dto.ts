import * as Yup from "yup";
import normalizedString from "../../../utils/validators/normalized-string";
import strongPassword from "../../../utils/validators/strong-password";

// Schema de validação para registro de administrador
export const registerAdminSchema = Yup.object({
  // Nome
  name: normalizedString()
    .required("O nome é obrigatório.")
    .max(100, "O nome deve ter no máximo 100 caracteres."),

  // E-mail
  email: Yup.string()
    .transform((value) =>
      typeof value === "string" ? value.trim().toLowerCase() : value,
    )
    .required("O e-mail é obrigatório.")
    .email("Informe um e-mail válido.")
    .max(150, "O e-mail deve ter no máximo 150 caracteres."),

  // Senha
  password: strongPassword().required("A senha é obrigatória."),
});

export type RegisterAdminDTO = Yup.InferType<typeof registerAdminSchema>;
