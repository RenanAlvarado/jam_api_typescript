import type { RequestHandler } from "express";
import { ValidationError, type AnyObjectSchema } from "yup";
import AppError from "../errors/AppError";

const validateQuery = (schema: AnyObjectSchema): RequestHandler => {
  return async (req, res, next) => {
    try {
      const validatedQuery = await schema.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      res.locals.validatedQuery = validatedQuery;

      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors = error.inner.length > 0 ? error.inner : [error];

        const details = validationErrors.map((validationError) => ({
          field: validationError.path ?? "query",
          message: validationError.message,
        }));

        next(
          new AppError(
            "Os parâmetros de pesquisa são inválidos.",
            400,
            details,
          ),
        );

        return;
      }

      next(error);
    }
  };
};

export default validateQuery;
