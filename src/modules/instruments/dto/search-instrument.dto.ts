import * as Yup from "yup";
import normalizedString from "../../../utils/validators/normalized-string";
import { searchParamsSchema } from "../../../common/dto/search-params.dto";

export const searchInstrumentSchema = searchParamsSchema.shape({
  name: normalizedString()
    .transform((value) => (value === "" ? undefined : value))
    .max(50, "O nome deve possuir no máximo 50 caracteres.")
    .optional(),
});

export type SearchInstrumentDTO = Yup.InferType<typeof searchInstrumentSchema>;
