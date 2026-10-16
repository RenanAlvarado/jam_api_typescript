import axios from "axios";

import AppError from "../../errors/AppError";
import type { ViaCepResponseDTO } from "./dto/viacep-response.dto";

const VIACEP_BASE_URL = "https://viacep.com.br/ws";
const REQUEST_TIMEOUT = 5000;

class ViaCepService {
  // Search Address
  async find(zip_code: string): Promise<ViaCepResponseDTO> {
    try {
      const response = await axios.get<ViaCepResponseDTO>(
        `${VIACEP_BASE_URL}/${zip_code}/json/`,
        {
          timeout: REQUEST_TIMEOUT,
        },
      );

      const data = response.data;

      if (response.data.erro === true || response.data.erro === "true") {
        throw new AppError("CEP informado não existe.", 400);
      }

      return {
        cep: data.cep,
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
      };
    } catch (error: unknown) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Não foi possível consultar o serviço ViaCEP.", 502);
    }
  }
}

export default new ViaCepService();
