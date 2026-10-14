import type { RequestHandler } from "express";
import { ValidationError, type AnyObjectSchema } from "yup";
import AppError from "../errors/AppError";

const validateSchema = (schema: AnyObjectSchema): RequestHandler => {
  return async (req, _res, next) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = error.inner.length > 0 ? error.inner : [error];

        const details = errors.map((validationError) => ({
          field: validationError.path ?? "body",
          message: validationError.message,
        }));

        next(new AppError("Os dados enviados são inválidos.", 400, details));

        return;
      }

      next(error);
    }
  };
};

export default validateSchema;
