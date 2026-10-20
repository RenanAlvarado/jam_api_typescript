import { Router } from "express";
import adminController from "./admin.controller";
import authenticate from "../../middlewares/authenticationHeader";
import validateSchema from "../../middlewares/validateSchema";
import { updateAdminSchema } from "./dto/update-admin.dto";

const adminRoutes = Router();

// #region GET /admins
/**
 * @openapi
 * /admins:
 *   get:
 *     tags:
 *       - Admins
 *     summary: Consultar a própria conta
 *     description: Retorna os dados do administrador autenticado. O identificador é obtido do token JWT enviado no cabeçalho Authorization.
 *     operationId: showMyAdminAccount
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Dados do administrador retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminResponse'
 *       '401':
 *         description: Token ausente, inválido ou expirado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missingToken:
 *                 summary: Token não informado
 *                 value:
 *                   status: error
 *                   message: Token de autenticação não informado.
 *               invalidToken:
 *                 summary: Token inválido
 *                 value:
 *                   status: error
 *                   message: Token inválido.
 *               expiredToken:
 *                 summary: Token expirado
 *                 value:
 *                   status: error
 *                   message: Token expirado.
 *       '404':
 *         description: Administrador autenticado não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Administrador não encontrado.
 */
adminRoutes.get("/", authenticate, adminController.show.bind(adminController));
// #endregion

// #region PUT /admins
/**
 * @openapi
 * /admins:
 *   put:
 *     tags:
 *       - Admins
 *     summary: Atualizar a própria conta
 *     description: Atualiza os dados permitidos do administrador autenticado. O identificador é obtido do token JWT. Envie somente os campos que deseja alterar.
 *     operationId: updateMyAdminAccount
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAdmin'
 *           examples:
 *             updateName:
 *               summary: Atualizar nome
 *               value:
 *                 name: Renan Amaral
 *             updatePassword:
 *               summary: Atualizar senha
 *               value:
 *                 password: NovaSenha123!
 *             updateNameAndPassword:
 *               summary: Atualizar nome e senha
 *               value:
 *                 name: Renan Amaral
 *                 password: NovaSenha123!
 *     responses:
 *       '200':
 *         description: Dados do administrador atualizados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminResponse'
 *       '400':
 *         description: Dados enviados inválidos ou body sem campos válidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: Token ausente, inválido ou expirado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missingToken:
 *                 summary: Token não informado
 *                 value:
 *                   status: error
 *                   message: Token de autenticação não informado.
 *               invalidToken:
 *                 summary: Token inválido
 *                 value:
 *                   status: error
 *                   message: Token inválido.
 *               expiredToken:
 *                 summary: Token expirado
 *                 value:
 *                   status: error
 *                   message: Token expirado.
 *       '404':
 *         description: Administrador autenticado não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Administrador não encontrado.
 */
adminRoutes.put(
  "/",
  authenticate,
  validateSchema(updateAdminSchema),
  adminController.update.bind(adminController),
);
// #endregion

// #region DELETE /admins
/**
 * @openapi
 * /admins:
 *   delete:
 *     tags:
 *       - Admins
 *     summary: Excluir a própria conta
 *     description: Exclui a conta do administrador autenticado. O identificador é obtido a partir do token JWT enviado no cabeçalho Authorization.
 *     operationId: deleteMyAdminAccount
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Conta excluída com sucesso.
 *       '401':
 *         description: Token ausente, inválido ou expirado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Token expirado.
 *       '404':
 *         description: Administrador autenticado não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Administrador não encontrado.
 */
adminRoutes.delete(
  "/",
  authenticate,
  adminController.delete.bind(adminController),
);
// #endregion

export default adminRoutes;
