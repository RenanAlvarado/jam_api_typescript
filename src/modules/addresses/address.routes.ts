import { Router } from "express";

import addressController from "./address.controller";
import validateSchema from "../../middlewares/validateSchema";
import { createAddressSchema } from "./dto/create-address.dto";

const addressRoutes = Router();

// #region POST /addresses
/**
 * @openapi
 * /addresses:
 *   post:
 *     tags:
 *       - Addresses
 *     summary: Cadastrar endereço
 *     description: Cadastra um endereço a partir do CEP informado, consultando o ViaCEP para preencher os dados oficiais e gerando uma URL do Google Maps.
 *     operationId: createAddress
 *     requestBody:
 *       required: true
 *       description: Dados necessários para cadastrar o endereço.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAddress'
 *           example:
 *             place_name: Escritório Principal
 *             number: "323"
 *             zip_code: "58400-550"
 *             complement: Sala 1234
 *     responses:
 *       '201':
 *         description: Endereço cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressResponse'
 *             example:
 *               id: 1
 *               place_name: Escritório Principal
 *               street: Rua Rodrigues Alves
 *               number: "323"
 *               district: Prata
 *               city: Campina Grande
 *               state: PB
 *               zip_code: "58400550"
 *               complement: Sala 1234
 *               maps_url: https://www.google.com/maps/search/?api=1&query=Rua%20Rodrigues%20Alves%2C%20323%2C%20Prata%2C%20Campina%20Grande%2C%20PB
 *       '400':
 *         description: Dados inválidos ou CEP inexistente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: O CEP deve conter exatamente oito dígitos.
 *       '502':
 *         description: Falha na comunicação com o serviço ViaCEP.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Não foi possível consultar o serviço ViaCEP.
 */
addressRoutes.post(
  "/",
  validateSchema(createAddressSchema),
  addressController.store.bind(addressController),
);
// #endregion

// #region GET /addresses/cep/:zip_code
/**
 * @openapi
 * /addresses/cep/{zip_code}:
 *   get:
 *     tags:
 *       - Addresses
 *     summary: Consultar endereço por CEP
 *     description: Consulta um CEP no serviço ViaCEP e retorna os dados de endereço encontrados. Não salva os dados no banco de dados.
 *     operationId: findAddressByCep
 *     parameters:
 *       - in: path
 *         name: zip_code
 *         required: true
 *         description: CEP com oito dígitos, com ou sem hífen.
 *         schema:
 *           type: string
 *           example: "58400-550"
 *     responses:
 *       '200':
 *         description: Endereço consultado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ViaCepResponse'
 *             example:
 *               cep: "58400-550"
 *               logradouro: Rua Rodrigues Alves
 *               bairro: Prata
 *               localidade: Campina Grande
 *               uf: PB
 *       '400':
 *         description: CEP inválido ou inexistente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: CEP inválido.
 *       '502':
 *         description: Falha na comunicação com o serviço ViaCEP.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Não foi possível consultar o serviço ViaCEP.
 */
addressRoutes.get(
  "/cep/:zip_code",
  addressController.findByCep.bind(addressController),
);
// #endregion

export default addressRoutes;
