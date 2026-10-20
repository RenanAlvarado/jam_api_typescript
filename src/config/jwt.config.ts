import type { SignOptions } from "jsonwebtoken";

// Segredo utilizado para assinar e verificar tokens
const secret = process.env.JWT_SECRET;

if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
  throw new Error(
    "JWT_SECRET é obrigatório e deve possuir pelo menos 32 bytes.",
  );
}

// Expiração padrão do token
const expiresIn = process.env.JWT_EXPIRES_IN ?? "1h";

const jwtConfig = {
  secret,
  expiresIn: expiresIn as SignOptions["expiresIn"],
};

export default jwtConfig;
