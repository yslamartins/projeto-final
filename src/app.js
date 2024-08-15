const express = require('express');
const app = express();

const productsRoutes = require('./routes/ProductsRoutes');
// const router_users = require('./routes/usersRouters');

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(productsRoutes);
// app.use(router_users);

module.exports = app;