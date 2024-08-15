const express = require('express');
const router = require('./routes/CategoriasRouters');
// const router_users = require('./routes/usersRouters');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
app.use(router);
// app.use(router_users);

module.exports = app;
