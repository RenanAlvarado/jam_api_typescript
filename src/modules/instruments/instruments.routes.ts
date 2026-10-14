import { Router } from "express";

import instrumentController from "./instrument.controller";
import validateSchema from "../../middlewares/validateSchema";
import validateQuery from "../../middlewares/validateQuery";

import { createInstrumentSchema } from "./dto/create-instrument.dto";
import { updateInstrumentSchema } from "./dto/update-instrument.dto";
import { searchInstrumentSchema } from "./dto/search-instrument.dto";

const instrumentRoutes = Router();

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
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 50
 *                 description: Nome do instrumento musical.
 *                 example: Guitarra
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
 *             example:
 *               status: error
 *               message: O nome do instrumento é obrigatório.
 *       '409':
 *         description: Já existe um instrumento com esse nome.
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Este instrumento já está cadastrado.
 */
instrumentRoutes.post(
  "/",
  validateSchema(createInstrumentSchema),
  instrumentController.store.bind(instrumentController),
);

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
 *         description: Número da página.
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
 *         description: Ordenação pelo nome do instrumento.
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
 *               type: object
 *               required:
 *                 - status
 *                 - message
 *                 - data
 *                 - pagination
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Instrumentos listados com sucesso.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InstrumentResponse'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
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
 */
instrumentRoutes.get(
  "/",
  validateQuery(searchInstrumentSchema),
  instrumentController.index.bind(instrumentController),
);

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
 *         description: Identificador do instrumento.
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
 *       '404':
 *         description: Instrumento não encontrado.
 */
instrumentRoutes.get(
  "/:id",
  instrumentController.show.bind(instrumentController),
);

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
 *         description: Identificador do instrumento.
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     requestBody:
 *       required: true
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
 *         description: Identificador ou dados inválidos.
 *       '404':
 *         description: Instrumento não encontrado.
 *       '409':
 *         description: Já existe um instrumento com esse nome.
 */
instrumentRoutes.put(
  "/:id",
  validateSchema(updateInstrumentSchema),
  instrumentController.update.bind(instrumentController),
);

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
 *         description: Identificador do instrumento.
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       '204':
 *         description: Instrumento excluído com sucesso. A resposta não possui corpo.
 *       '400':
 *         description: Identificador inválido.
 *       '404':
 *         description: Instrumento não encontrado.
 */
instrumentRoutes.delete(
  "/:id",
  instrumentController.delete.bind(instrumentController),
);

export default instrumentRoutes;
