import type { Request, Response } from "express";
import parseCep from "../../utils/parseCep";
import addressService from "./address.service";
import type { CreateAddressDTO } from "./dto/create-address.dto";

class AddressController {
  // Criar endereço
  async store(req: Request, res: Response): Promise<void> {
    const address = await addressService.store(req.body as CreateAddressDTO);

    res.status(201).json(address);
  }

  // Buscar endereço por CEP
  async findByCep(req: Request, res: Response): Promise<void> {
    const zip_code = parseCep(req.params.zip_code);

    const address = await addressService.findByCep(zip_code);

    res.status(200).json(address);
  }
}

export default new AddressController();
