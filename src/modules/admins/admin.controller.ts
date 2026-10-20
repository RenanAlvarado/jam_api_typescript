import type { Request, Response } from "express";
import adminService from "./admin.service";
import { UpdateAdminDTO } from "./dto/update-admin.dto";

class AdminController {
  // Buscar dados do administrador autenticado
  async show(_req: Request, res: Response): Promise<void> {
    const adminId = res.locals.authenticatedAdminId as number;

    const admin = await adminService.show(adminId);

    res.status(200).json(admin);
  }

  // Atualizar dados do administrador autenticado
  async update(req: Request, res: Response): Promise<void> {
    const adminId = res.locals.authenticatedAdminId as number;

    const admin = await adminService.update(
      adminId,
      req.body as UpdateAdminDTO,
    );

    res.status(200).json(admin);
  }

  // Excluir a própria conta
  async delete(_req: Request, res: Response): Promise<void> {
    const adminId = res.locals.authenticatedAdminId as number;

    await adminService.delete(adminId);

    res.status(204).send();
  }
}

export default new AdminController();
