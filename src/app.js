const express = require('express');
const app = express();
const { swaggerUi, swaggerSpec } = require('../swagger');

const productsRoutes = require('./routes/productsRoutes');
const categoriesRoutes = require('./routes/categoriesRouters');
const router_users = require('./routes/usersRouters');
const loginRouter = require('./routes/loginRouter');

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(productsRoutes);
app.use(categoriesRoutes);
app.use(router_users);
app.use(loginRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
