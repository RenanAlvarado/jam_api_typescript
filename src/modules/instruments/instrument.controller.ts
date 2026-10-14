import type { Request, Response } from "express";
import parseId from "../../utils/parseId";
import instrumentService from "./instrument.service";
import type { CreateInstrumentDTO } from "./dto/create-instrument.dto";
import type { UpdateInstrumentDTO } from "./dto/update-instrument.dto";
import { SearchInstrumentDTO } from "./dto/search-instrument.dto";
import { sendPaginatedListResponse } from "../../common/responses/paginated-list-response";

class InstrumentController {
  // Criar instrumento
  async store(req: Request, res: Response): Promise<void> {
    const instrument = await instrumentService.store(
      req.body as CreateInstrumentDTO,
    );

    res.status(201).json(instrument);
  }

  // Listar instrumentos
  async index(_req: Request, res: Response): Promise<void> {
    const searchParams = res.locals.validatedQuery as SearchInstrumentDTO;

    const result = await instrumentService.index(searchParams);

    sendPaginatedListResponse(
      res,
      result.data,
      result.pagination,
      "Instrumentos listados com sucesso.",
    );
  }

  // Buscar instrumento por ID
  async show(req: Request, res: Response): Promise<void> {
    const id = parseId(req.params.id);
    const instrument = await instrumentService.show(id);

    res.status(200).json(instrument);
  }

  // Atualizar instrumento
  async update(req: Request, res: Response): Promise<void> {
    const id = parseId(req.params.id);

    const instrument = await instrumentService.update(
      id,
      req.body as UpdateInstrumentDTO,
    );

    res.status(200).json(instrument);
  }

  // Excluir instrumento
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseId(req.params.id);

    await instrumentService.delete(id);

    res.status(204).send();
  }
}

export default new InstrumentController();
