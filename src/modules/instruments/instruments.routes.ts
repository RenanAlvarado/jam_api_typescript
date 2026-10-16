import { Router } from "express";

import instrumentController from "./instrument.controller";
import validateSchema from "../../middlewares/validateSchema";
import validateQuery from "../../middlewares/validateQuery";

import { createInstrumentSchema } from "./dto/create-instrument.dto";
import { updateInstrumentSchema } from "./dto/update-instrument.dto";
import { searchInstrumentSchema } from "./dto/search-instrument.dto";

const instrumentRoutes = Router();

// #region POST /instruments
/**
 * @openapi
 * /instruments:
 *   post:
 *     tags:
 *       - Instruments
 *     summary: Cadastrar instrumento
 *     description: Cadastra um novo instrumento musical.
 *     operationId: createInstrument
 *     requestBody:
 *       required: true
 *       description: Dados necessários para cadastrar o instrumento.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateInstrument'
 *           example:
 *             name: Guitarra
 *     responses:
 *       '201':
 *         description: Instrumento cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InstrumentResponse'
 *             example:
 *               id: 1
 *               name: Guitarra
 *       '400':
 *         description: Dados da requisição inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: O nome do instrumento é obrigatório.
 *       '409':
 *         description: Já existe um instrumento com esse nome.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Este instrumento já está cadastrado.
 */
instrumentRoutes.post(
  "/",
  validateSchema(createInstrumentSchema),
  instrumentController.store.bind(instrumentController),
);
// #endregion

// #region GET /instruments
/**
 * @openapi
 * /instruments:
 *   get:
 *     tags:
 *       - Instruments
 *     summary: Listar instrumentos
 *     description: Retorna uma lista paginada de instrumentos, com filtros e ordenação.
 *     operationId: listInstruments
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Número da página a ser consultada.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         example: 1
 *       - in: query
 *         name: limit
 *         description: Quantidade máxima de registros por página.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 10
 *       - in: query
 *         name: order
 *         description: Ordenação dos instrumentos pelo nome.
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         example: ASC
 *       - in: query
 *         name: name
 *         description: Filtra instrumentos pelo nome.
 *         schema:
 *           type: string
 *           maxLength: 50
 *         example: Guitarra
 *     responses:
 *       '200':
 *         description: Instrumentos listados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InstrumentListResponse'
 *             example:
 *               status: success
 *               message: Instrumentos listados com sucesso.
 *               data:
 *                 - id: 1
 *                   name: Guitarra
 *                 - id: 2
 *                   name: Piano
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 2
 *                 totalPages: 1
 *       '400':
 *         description: Parâmetros de consulta inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Parâmetros de consulta inválidos.
 */
instrumentRoutes.get(
  "/",
  validateQuery(searchInstrumentSchema),
  instrumentController.index.bind(instrumentController),
);
// #endregion

// #region GET /instruments/:id
/**
 * @openapi
 * /instruments/{id}:
 *   get:
 *     tags:
 *       - Instruments
 *     summary: Buscar instrumento por ID
 *     description: Retorna os dados de um instrumento específico.
 *     operationId: getInstrumentById
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do instrumento.
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       '200':
 *         description: Instrumento encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InstrumentResponse'
 *             example:
 *               id: 1
 *               name: Guitarra
 *       '400':
 *         description: Identificador inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Identificador inválido.
 *       '404':
 *         description: Instrumento não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Instrumento não encontrado.
 */
instrumentRoutes.get(
  "/:id",
  instrumentController.show.bind(instrumentController),
);
// #endregion

// #region PUT /instruments/:id
/**
 * @openapi
 * /instruments/{id}:
 *   put:
 *     tags:
 *       - Instruments
 *     summary: Atualizar instrumento
 *     description: Atualiza os dados de um instrumento existente.
 *     operationId: updateInstrument
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do instrumento.
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     requestBody:
 *       required: true
 *       description: Dados para atualizar o instrumento.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateInstrument'
 *           example:
 *             name: Violão
 *     responses:
 *       '200':
 *         description: Instrumento atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InstrumentResponse'
 *             example:
 *               id: 1
 *               name: Violão
 *       '400':
 *         description: Identificador ou dados da requisição inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Dados da requisição inválidos.
 *       '404':
 *         description: Instrumento não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Instrumento não encontrado.
 *       '409':
 *         description: Já existe outro instrumento com esse nome.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Este instrumento já está cadastrado.
 */
instrumentRoutes.put(
  "/:id",
  validateSchema(updateInstrumentSchema),
  instrumentController.update.bind(instrumentController),
);
// #endregion

// #region DELETE /instruments/:id
/**
 * @openapi
 * /instruments/{id}:
 *   delete:
 *     tags:
 *       - Instruments
 *     summary: Excluir instrumento
 *     description: Exclui um instrumento pelo seu identificador.
 *     operationId: deleteInstrument
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do instrumento.
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       '204':
 *         description: Instrumento excluído com sucesso. A resposta não possui corpo.
 *       '400':
 *         description: Identificador inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Identificador inválido.
 *       '404':
 *         description: Instrumento não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Instrumento não encontrado.
 */
instrumentRoutes.delete(
  "/:id",
  instrumentController.delete.bind(instrumentController),
);
// #endregion

export default instrumentRoutes;
