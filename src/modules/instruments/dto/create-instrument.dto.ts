import * as Yup from "yup";
import normalizedString from "../../../utils/validators/normalized-string";

export const createInstrumentSchema = Yup.object({
  name: normalizedString()
    .required("O nome do instrumento é obrigatório.")
    .max(50, "O nome deve possuir no máximo 50 caracteres."),
});

export type CreateInstrumentDTO = Yup.InferType<typeof createInstrumentSchema>;
