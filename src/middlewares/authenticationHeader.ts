import type { RequestHandler } from "express";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import AppError from "../errors/AppError";
import authTokenService from "../modules/auth/auth-token.service";

const authenticate: RequestHandler = (req, res, next) => {
  const authorization = req.get("Authorization");

  if (!authorization) {
    return next(new AppError("Token de autenticação não informado.", 401));
  }

  const [scheme, token, ...extraParts] = authorization.trim().split(/\s+/);

  if (scheme !== "Bearer" || !token || extraParts.length > 0) {
    return next(
      new AppError(
        "Cabeçalho Authorization inválido. Use Bearer <token>.",
        401,
      ),
    );
  }

  try {
    const payload = authTokenService.verifyAccessToken(token);
    const adminId = Number(payload.sub);

    if (!Number.isSafeInteger(adminId) || adminId <= 0) {
      return next(new AppError("Token inválido.", 401));
    }

    res.locals.authenticatedAdminId = adminId;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new AppError("Token expirado.", 401));
    }

    if (error instanceof NotBeforeError) {
      return next(new AppError("Token ainda não está válido.", 401));
    }

    if (error instanceof JsonWebTokenError) {
      return next(new AppError("Token inválido.", 401));
    }

    next(error);
  }
};

export default authenticate;
