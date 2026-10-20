import jwt from "jsonwebtoken";
import jwtConfig from "../../config/jwt.config";
import AppError from "../../errors/AppError";
import type { AuthTokenPayload } from "./types/auth-token.types";

class AuthTokenService {
  // Gerar token de acesso
  signAccessToken(adminId: number): string {
    return jwt.sign({ sub: String(adminId) }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
      algorithm: "HS256",
    });
  }

  // Verificar token de acesso
  verifyAccessToken(token: string): AuthTokenPayload {
    const payload = jwt.verify(token, jwtConfig.secret, {
      algorithms: ["HS256"],
    });

    if (typeof payload === "string" || typeof payload.sub !== "string") {
      throw new AppError("Token inválido.", 401);
    }

    return payload as AuthTokenPayload;
  }
}

export default new AuthTokenService();
