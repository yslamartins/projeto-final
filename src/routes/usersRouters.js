const express = require("express");
const router = express.Router();

const usersController = require('../controllers/usersController')
const usersMiddleware = require('../middleware/usersMiddleware')

router.post("/users",
     usersMiddleware.insertUserMiddleware,
     usersController.createUser
);
router.get("/users/:id",
     usersMiddleware.middlewareGetUserById,
     usersController.getUserById
);
router.delete("/users/:id",
     usersController.deleteUser,
     usersMiddleware.middlewareDeleteUser
);

module.exports = router;