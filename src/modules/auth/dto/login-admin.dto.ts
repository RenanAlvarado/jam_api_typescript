import * as Yup from "yup";
import email from "../../../utils/validators/email";

export const loginSchema = Yup.object({
  email: email().required("O e-mail é obrigatório."),

  password: Yup.string()
    .required("A senha é obrigatória.")
    .max(128, "A senha deve ter no máximo 128 caracteres."),
});

export type LoginDTO = Yup.InferType<typeof loginSchema>;
