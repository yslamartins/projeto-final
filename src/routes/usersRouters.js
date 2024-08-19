/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         firstname:
 *           type: string
 *           example: John
 *         surname:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           example: securepassword123
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-08-18T00:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-08-18T00:00:00Z"
 */

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Adiciona um novo usuário ao banco de dados.
 *     requestBody:
 *       description: Dados do novo usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos ou usuário já cadastrado
 *   get:
 *     summary: Obtém todos os usuários
 *     description: Retorna uma lista de todos os usuários.
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Obtém um usuário por ID
 *     description: Retorna detalhes de um usuário específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *   put:
 *     summary: Atualiza um usuário por ID
 *     description: Atualiza as informações de um usuário específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados para atualizar o usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *   delete:
 *     summary: Deleta um usuário por ID
 *     description: Remove um usuário do banco de dados.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @openapi
 * /users/password/{id}:
 *   put:
 *     summary: Atualiza a senha de um usuário por ID
 *     description: Atualiza a senha de um usuário específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados para atualizar a senha do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: newsecurepassword123
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 */

const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.post(
  '/users',
  usersMiddleware.middlewareInsertUser,
  usersController.createUser,
);

router.get('/users', usersController.getAllUsers);

router.get(
  '/users/:id',
  usersMiddleware.middlewareGetUserById,
  usersController.getUserById,
);

router.put(
  '/users/:id',
  usersMiddleware.middlewareUpdateUser,
  usersController.updateUser,
);

router.put(
  '/users/password/:id',
  usersMiddleware.middlewareUpdatePassword,
  usersController.updatePassword,
);

router.delete(
  '/users/:id',
  usersMiddleware.middlewareDeleteUser,
  usersController.deleteUser,
);

module.exports = router;
