import * as Yup from "yup";
import normalizedString from "../../../utils/validators/normalized-string";
import strongPassword from "../../../utils/validators/strong-password";
import email from "../../../utils/validators/email";

// Schema de validação para registro de administrador
export const registerAdminSchema = Yup.object({
  // Nome
  name: normalizedString()
    .required("O nome é obrigatório.")
    .max(100, "O nome deve ter no máximo 100 caracteres."),

  // E-mail
  email: email().required("O e-mail é obrigatório."),

  // Senha
  password: strongPassword().required("A senha é obrigatória."),
});

export type RegisterAdminDTO = Yup.InferType<typeof registerAdminSchema>;
