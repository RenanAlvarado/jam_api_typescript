import axios from "axios";
import AppError from "../../errors/AppError";
import type { ViaCepResponseDTO } from "./dto/viacep-response.dto";

const VIACEP_BASE_URL = "https://viacep.com.br/ws";
const REQUEST_TIMEOUT = 5000;

class ViaCepService {
  // Normalizar texto recebido da API externa
  private normalizeText(value: string | null | undefined): string {
    return (value ?? "").replace(/\s+/g, " ").trim();
  }

  // Search Address
  async find(zip_code: string): Promise<ViaCepResponseDTO> {
    try {
      const normalizedZipCode = zip_code.replace(/\D/g, "");

      const response = await axios.get<ViaCepResponseDTO>(
        `${VIACEP_BASE_URL}/${normalizedZipCode}/json/`,
        {
          timeout: REQUEST_TIMEOUT,
        },
      );

      const data = response.data;

      if (data.erro === true || data.erro === "true") {
        throw new AppError("CEP informado não existe.", 400);
      }

      return {
        cep: this.normalizeText(data.cep).replace(/\D/g, ""),
        logradouro: this.normalizeText(data.logradouro),
        bairro: this.normalizeText(data.bairro),
        localidade: this.normalizeText(data.localidade),
        uf: this.normalizeText(data.uf).toUpperCase(),
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
