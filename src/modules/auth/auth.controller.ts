import type { Request, Response } from "express";
import authService from "./auth.service";
import type { LoginDTO } from "./dto/login-admin.dto";
import { RegisterAdminDTO } from "./dto/register-admin.dto";

class AuthController {
  // Registrar administrador
  async register(req: Request, res: Response): Promise<void> {
    const admin = await authService.register(req.body as RegisterAdminDTO);

    res.status(201).json(admin);
  }

  // Autenticar administrador
  async login(req: Request, res: Response): Promise<void> {
    const auth = await authService.login(req.body as LoginDTO);

    res.status(200).json(auth);
  }
}

export default new AuthController();
