import { Router } from "express";

import addressController from "./address.controller";

const addressRoutes = Router();

// #region GET /addresses/cep/:zip_code
/**
 * @openapi
 * /addresses/cep/{zip_code}:
 *   get:
 *     tags:
 *       - Addresses
 *     summary: Consultar endereço por CEP
 *     description: Consulta um CEP no serviço ViaCEP e retorna os dados de endereço encontrados. Aceita CEP com ou sem hífens, desde que contenha exatamente oito dígitos. Não salva os dados no banco de dados.
 *     operationId: findAddressByCep
 *     parameters:
 *       - in: path
 *         name: zip_code
 *         required: true
 *         description: CEP com exatamente oito dígitos numéricos, com ou sem hífens.
 *         schema:
 *           type: string
 *           pattern: '^(?=(?:\D*\d){8}\D*$)\d+(?:-\d+)*$'
 *         example: "013-10100"
 *     responses:
 *       '200':
 *         description: Endereço consultado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ViaCepResponse'
 *             example:
 *               logradouro: Avenida Paulista
 *               bairro: Bela Vista
 *               localidade: São Paulo
 *               uf: SP
 *       '400':
 *         description: CEP com formato inválido ou inexistente.
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
