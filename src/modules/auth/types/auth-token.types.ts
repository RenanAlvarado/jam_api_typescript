import type { JwtPayload } from "jsonwebtoken";

// Dados esperados dentro do token de autenticação
export interface AuthTokenPayload extends JwtPayload {
  sub: string;
}

// Resposta retornada após autenticação bem-sucedida
export interface AuthTokenResponse {
  access_token: string;
  token_type: "Bearer";
}
