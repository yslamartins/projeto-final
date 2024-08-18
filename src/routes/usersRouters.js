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
  'users/:id',
  usersMiddleware.middlewareInsertUser,
  usersController.updateUser,
);
router.delete(
  '/users/:id',
  usersMiddleware.middlewareDeleteUser,
  usersController.deleteUser,
);

module.exports = router;
