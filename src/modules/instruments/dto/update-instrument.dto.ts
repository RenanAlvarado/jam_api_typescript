import * as Yup from "yup";
import normalizedString from "../../../utils/validators/normalized-string";

export const updateInstrumentSchema = Yup.object({
  name: normalizedString()
    .required("O nome do instrumento é obrigatório.")
    .max(50, "O nome deve possuir no máximo 50 caracteres."),
});

export type UpdateInstrumentDTO = Yup.InferType<typeof updateInstrumentSchema>;
