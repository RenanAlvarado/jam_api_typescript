import * as Yup from "yup";

const normalizedString = () =>
  Yup.string().transform((value) =>
    typeof value === "string" ? value.trim().replace(/\s+/g, " ") : value,
  );

export default normalizedString;
