import bcrypt from "bcryptjs";
import AppError from "../../errors/AppError";
import authTokenService from "./auth-token.service";
import type { AuthTokenResponse } from "./types/auth-token.types";
import adminService from "../admins/admin.service";
import type { LoginDTO } from "./dto/login-admin.dto";
import { RegisterAdminDTO } from "./dto/register-admin.dto";
import { AdminResponseDTO } from "../admins/dto/admin-response.dto";

class AuthService {
  // Registrar administrador
  async register(
    registerAdminDTO: RegisterAdminDTO,
  ): Promise<AdminResponseDTO & AuthTokenResponse> {
    const admin = await adminService.store(registerAdminDTO);

    const accessToken = authTokenService.signAccessToken(admin.id);

    return {
      ...admin,
      access_token: accessToken,
      token_type: "Bearer",
    };
  }

  // Autenticar administrador e gerar token
  async login(loginDTO: LoginDTO): Promise<AuthTokenResponse> {
    const { email, password } = loginDTO;

    // Buscar administrador pelo e-mail
    const admin = await adminService.findEntityByEmail(email);

    // Validar credenciais
    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      throw new AppError("E-mail ou senha inválidos.", 401);
    }

    // Gerar token de acesso
    const accessToken = authTokenService.signAccessToken(admin.id);

    return {
      access_token: accessToken,
      token_type: "Bearer",
    };
  }
}

export default new AuthService();
