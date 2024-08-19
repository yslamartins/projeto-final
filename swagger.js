const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce Tech',
            version: '1.0.0',
            description: 'Documentação das APIs para usuários, categorias e produtos',
        },
        servers: [
            {
                url: 'http://localhost:3000', 
            },
        ],
    },
    apis: ['src/routes/usersRouters.js', './src/routes/ProductsRoutes.js', './src/routes/CategoriesRouters.js', './src/routes/loginRouter.js'], 
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
