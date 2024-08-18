const express = require('express');
const app = express();
const { swaggerUi, swaggerSpec } = require('../swagger');

const productsRoutes = require('./routes/ProductsRoutes');
const categoriesRoutes = require('./routes/CategoriesRouters');
const router_users = require('./routes/usersRouters');

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(productsRoutes);
app.use(categoriesRoutes);
app.use(router_users);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
