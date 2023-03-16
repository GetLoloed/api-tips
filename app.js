const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const servicesRoutes = require('./routes/servicesRoutes');
const tipsRoutes = require('./routes/tipsRoutes');
const usersRoutes = require('./routes/usersRoutes');

const { swaggerUi, specs } = require('./swagger');
function startServer() {
    // Create Express app
    const app = express();

    // Set port number
    const port = 3000;

    // Parse incoming request bodies in JSON format
    app.use(bodyParser.json());

    // Test database connection
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection to the database has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    // Add services and tips routes
    app.use('/services', servicesRoutes);
    app.use('/tips', tipsRoutes);
    app.use('/users', usersRoutes);

    // Start server
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

module.exports = startServer;
