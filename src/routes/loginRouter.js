/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: e-mail para login
 *         password:
 *           type: string
 *           description: Senha para login
 *       required:
 *         - email
 *         - password
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token JWT gerado após o login
 *         refreshToken:
 *           type: string
 *           description: Token de atualização (opcional)
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *       required: true
 *     responses:
 *       '200':
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       '401':
 *         description: Credenciais inválidas
 *       '400':
 *         description: Requisição mal formada
 */

const express = require('express');
const router = express.Router();

const { login } = require('../controllers/authController');
const { loginMiddleware } = require('../middleware/authMuiddleware');

router.post('/login', loginMiddleware, login);

module.exports = router;
