const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
      description: 'Documentação da minha API',
    },
  },
  apis: ['./src/routes/*.js'], // Caminho para os arquivos
};

const swaggerSpec = swaggerJSDoc(options);
