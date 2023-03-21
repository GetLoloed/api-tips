// swagger.js
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tips API',
            version: '1.0.0',
            description: 'Documentation for Tips API' +
                'This is a simple CRUD API application made with Express and documented with Swagger',
            contact: {
                name: 'Tips API Support'
            }
        },
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerDocs,
};
