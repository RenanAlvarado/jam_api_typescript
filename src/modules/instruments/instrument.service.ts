import { Repository } from "typeorm";
import database from "../../config/database.config";
import AppError from "../../errors/AppError";
import type { CreateInstrumentDTO } from "./dto/create-instrument.dto";
import type { UpdateInstrumentDTO } from "./dto/update-instrument.dto";
import type { InstrumentResponseDTO } from "./dto/instrument-response.dto";
import Instrument from "./instrument.entity";
import { SearchInstrumentDTO } from "./dto/search-instrument.dto";
import { PaginatedResponseDTO } from "../../common/dto/pagination-response.dto";

class InstrumentService {
  // Dependência do repositório
  private get instrumentRepository(): Repository<Instrument> {
    return database.getRepository(Instrument);
  }

  // Criar instrumento
  async store(
    createInstrumentDTO: CreateInstrumentDTO,
  ): Promise<InstrumentResponseDTO> {
    const { name } = createInstrumentDTO;

    await this.ensureNameAvailable(name);

    const instrument = this.instrumentRepository.create({ name });
    const savedInstrument = await this.instrumentRepository.save(instrument);

    return this.toResponseDTO(savedInstrument);
  }

  // Listar instrumentos
  async index(
    searchParams: SearchInstrumentDTO,
  ): Promise<PaginatedResponseDTO<InstrumentResponseDTO>> {
    const { page, limit, order, name } = searchParams;

    const queryBuilder = this.instrumentRepository
      .createQueryBuilder("instrument")
      .orderBy("instrument.name", order)
      .skip((page - 1) * limit)
      .take(limit);

    if (name) {
      queryBuilder.andWhere("instrument.name LIKE :name", {
        name: `%${name}%`,
      });
    }

    const [instruments, total] = await queryBuilder.getManyAndCount();

    return {
      data: instruments.map((instrument) => this.toResponseDTO(instrument)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Buscar instrumento por ID
  async show(id: number): Promise<InstrumentResponseDTO> {
    const instrument = await this.findEntityById(id);

    return this.toResponseDTO(instrument);
  }

  // Atualizar instrumento
  async update(
    id: number,
    updateInstrumentDTO: UpdateInstrumentDTO,
  ): Promise<InstrumentResponseDTO> {
    const instrument = await this.findEntityById(id);
    const { name } = updateInstrumentDTO;

    await this.ensureNameAvailable(name, id);

    instrument.name = name;

    const updatedInstrument = await this.instrumentRepository.save(instrument);

    return this.toResponseDTO(updatedInstrument);
  }

  // Excluir instrumento
  async delete(id: number): Promise<void> {
    const instrument = await this.findEntityById(id);

    await this.instrumentRepository.remove(instrument);
  }

  // Converter entidade para DTO de resposta
  private toResponseDTO(instrument: Instrument): InstrumentResponseDTO {
    return {
      id: instrument.id,
      name: instrument.name,
    };
  }

  // Buscar instrumento por ID (Sem padrão de resposta)
  private async findEntityById(id: number): Promise<Instrument> {
    const instrument = await this.instrumentRepository.findOneBy({ id });

    if (!instrument) {
      throw new AppError("Instrumento não encontrado.", 404);
    }

    return instrument;
  }

  // Verificar se o nome já está cadastrado
  private async ensureNameAvailable(
    name: string,
    ignoreId?: number,
  ): Promise<void> {
    const existingInstrument = await this.instrumentRepository.findOneBy({
      name,
    });

    if (existingInstrument && existingInstrument.id !== ignoreId) {
      throw new AppError("Este instrumento já está cadastrado.", 409);
    }
  }
}

export default new InstrumentService();
