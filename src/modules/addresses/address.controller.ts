import type { Request, Response } from "express";

import parseCep from "../../utils/parseCep";
import addressService from "./address.service";

class AddressController {
  // Buscar endereço por CEP
  async findByCep(req: Request, res: Response): Promise<void> {
    const zip_code = parseCep(req.params.zip_code);

    const address = await addressService.findByCep(zip_code);

    res.status(200).json(address);
  }
}

export default new AddressController();
