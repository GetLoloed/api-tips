// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); // Import Sequelize database connection
const servicesRoutes = require('./routes/servicesRoutes'); // Import services routes
const tipsRoutes = require('./routes/tipsRoutes'); // Import tips routes
const usersRoutes = require('./routes/usersRoutes'); // Import users routes

// Import Swagger setup
const { swaggerUi, swaggerDocs } = require('./swagger');

function startServer() {
    // Create Express app
    const app = express();

    // Set port number
    const port = 3000;

    // Parse incoming request bodies in JSON format
    app.use(bodyParser.json());

    // Test database connection using Sequelize
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection to the database has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    // Use Swagger setup from the separate file
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // Add services, tips, and users routes to the app
    app.use('/services', servicesRoutes);
    app.use('/tips', tipsRoutes);
    app.use('/users', usersRoutes);

    // Start the server
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

// Export the function for starting the server
module.exports = startServer;
