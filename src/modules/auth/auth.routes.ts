import { Router } from "express";

import authController from "./auth.controller";
import validateSchema from "../../middlewares/validateSchema";
import { loginSchema } from "./dto/login-admin.dto";
import { registerAdminSchema } from "./dto/register-admin.dto";

const authRoutes = Router();

// #region POST /auth/register
/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Cadastrar administrador
 *     description: Cadastra um administrador e retorna seus dados públicos, sem a senha.
 *     operationId: registerAdmin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterAdmin'
 *     responses:
 *       '201':
 *         description: Administrador cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminResponse'
 *       '400':
 *         description: Dados de entrada inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: O nome é obrigatório.
 *       '409':
 *         description: E-mail já cadastrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: Este e-mail já está cadastrado.
 */
authRoutes.post(
  "/register",
  validateSchema(registerAdminSchema),
  authController.register.bind(authController),
);
// #endregion

// #region POST /auth/login
/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Autenticar administrador
 *     description: Valida as credenciais do administrador e retorna um token JWT.
 *     operationId: loginAdmin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       '200':
 *         description: Autenticação realizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthTokenResponse'
 *             example:
 *               access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               token_type: Bearer
 *               expires_in: 1h
 *       '400':
 *         description: Dados de entrada inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: O e-mail é obrigatório.
 *       '401':
 *         description: E-mail ou senha inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               message: E-mail ou senha inválidos.
 */
authRoutes.post(
  "/login",
  validateSchema(loginSchema),
  authController.login.bind(authController),
);

// #endregion

export default authRoutes;
