const express = require('express');
const router = require('./routes/ProductsRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
app.use(router);


module.exports = app;