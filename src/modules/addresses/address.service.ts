import viaCepService from "../viaCep/viaCep.service";
import type { ViaCepResponseDTO } from "../viaCep/dto/viacep-response.dto";

class AddressService {
  // Search Address by CEP
  async findByCep(zip_code: string): Promise<ViaCepResponseDTO> {
    return await viaCepService.find(zip_code);
  }
}

export default new AddressService();
