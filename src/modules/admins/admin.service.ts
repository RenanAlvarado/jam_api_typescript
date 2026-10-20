import bcrypt from "bcryptjs";
import type { Repository } from "typeorm";
import database from "../../config/database.config";
import AppError from "../../errors/AppError";
import Admin from "./admin.entity";
import type { AdminResponseDTO } from "./dto/admin-response.dto";
import type { RegisterAdminDTO } from "../auth/dto/register-admin.dto";
import type { UpdateAdminDTO } from "./dto/update-admin.dto";

class AdminService {
  // Dependencies
  private get adminRepository(): Repository<Admin> {
    return database.getRepository(Admin);
  }

  // Registrar administrador
  async store(registerAdminDTO: RegisterAdminDTO): Promise<AdminResponseDTO> {
    const { name, email, password } = registerAdminDTO;

    // Verificar se o e-mail já está cadastrado
    await this.validateByEmail(email);

    // Gerar hash da senha
    const passwordHash = await this.hashPassword(password);

    // Criar entidade
    const admin = this.adminRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    // Salvar administrador
    const savedAdmin = await this.adminRepository.save(admin);

    // Retornar DTO de resposta
    return this.toResponseDTO(savedAdmin);
  }

  // Buscar administrador por ID
  async show(id: number): Promise<AdminResponseDTO> {
    const admin = await this.findEntityById(id);

    return this.toResponseDTO(admin);
  }

  // Atualizar administrador
  async update(
    id: number,
    updateAdminDTO: UpdateAdminDTO,
  ): Promise<AdminResponseDTO> {
    const admin = await this.findEntityById(id);
    const { name, password } = updateAdminDTO;

    // Atualizar nome
    if (name !== undefined) {
      admin.name = name;
    }

    // Atualizar senha
    if (password !== undefined) {
      admin.password_hash = await this.hashPassword(password);
    }

    // Salvar alterações
    const updatedAdmin = await this.adminRepository.save(admin);

    // Retornar DTO de resposta
    return this.toResponseDTO(updatedAdmin);
  }

  // Excluir administrador
  async delete(id: number): Promise<void> {
    const admin = await this.findEntityById(id);

    await this.adminRepository.remove(admin);
  }

  // Converter entidade para DTO de resposta
  private toResponseDTO(admin: Admin): AdminResponseDTO {
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      created_at: admin.created_at,
      updated_at: admin.updated_at,
    };
  }

  //   Busca por email, se encontrar retorna erro
  async validateByEmail(email: string): Promise<void> {
    const admin = await this.adminRepository.findOneBy({ email });

    if (admin) {
      throw new AppError("Este e-mail já está cadastrado.", 409);
    }
  }

  // Buscar entidade de administrador por ID
  private async findEntityById(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOneBy({ id });

    if (!admin) {
      throw new AppError("Administrador não encontrado.", 404);
    }

    return admin;
  }

  // Buscar entidade de administrador por e-mail
  async findEntityByEmail(email: string): Promise<Admin | null> {
    return this.adminRepository.findOneBy({ email });
  }

  //   Criar Hash de senha
  private async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password, 12);

    return hashPassword;
  }
}

export default new AdminService();
