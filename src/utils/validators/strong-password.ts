import * as Yup from "yup";

const strongPassword = () =>
  Yup.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .max(128, "A senha deve ter no máximo 128 caracteres.")
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .matches(
      /[^a-zA-Z0-9]/,
      "A senha deve conter pelo menos um caractere especial.",
    );

export default strongPassword;
