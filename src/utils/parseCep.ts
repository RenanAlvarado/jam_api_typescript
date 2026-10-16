import AppError from "../errors/AppError";

const parseCep = (value: unknown): string => {
  if (typeof value !== "string" || !/^\d+(?:-\d+)*$/.test(value)) {
    throw new AppError("CEP inválido.", 400);
  }

  const normalizedCep = value.replace(/-/g, "");

  if (!/^\d{8}$/.test(normalizedCep)) {
    throw new AppError("CEP inválido.", 400);
  }

  return normalizedCep;
};

export default parseCep;
