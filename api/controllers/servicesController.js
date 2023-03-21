// Importing the express-validator package to perform validation on incoming requests
const {validationResult} = require('express-validator');

// Importing the Service model from ../models/services
const Service = require('../models/services');

// Async function to create a new service
exports.createService = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // Extracting the shiftType and shiftClosed fields from the request body
    const {shiftType, shiftClosed} = req.body;

    try {
        // Creating a new service with shiftType and shiftClosed fields
        const service = await Service.create({shiftType, shiftClosed});

        // Sending the response with a success message and the newly created service
        res.status(201).json({message: 'Service created', service});
    } catch (err) {
        // Sending the error response if the service creation failed
        res.status(500).json({message: 'Error creating service', error: err});
    }

};

// Async function to get all the services
exports.getServices = async (req, res) => {
    try {
// Finding all the services in the Service model
        const services = await Service.findAll();

        // Sending the response with an array of services
        res.status(200).json({services});
    } catch (err) {
        // Sending the error response if fetching services failed
        res.status(500).json({message: 'Error fetching services', error: err});
    }
};

// Async function to get a service by id
exports.getServiceById = async (req, res) => {
    const {id} = req.params;

    try {
        // Finding a service with the provided id
        const service = await Service.findByPk(id);

        // Sending the response with the service object if it exists, else sending a not found error
        if (!service) {
            return res.status(404).json({message: 'Service not found'});
        }

        res.status(200).json({service});
    } catch (err) {
        // Sending the error response if fetching service failed
        res.status(500).json({message: 'Error fetching service', error: err});
    }
};

// Async function to update a service by id
exports.updateService = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {id} = req.params;
    const {shiftType, shiftClosed} = req.body;

    try {
        // Finding a service with the provided id
        const service = await Service.findByPk(id);

        // Sending a not found error response if the service doesn't exist
        if (!service) {
            return res.status(404).json({message: 'Service not found'});
        }

        // Updating the shiftType and shiftClosed fields of the service and saving the changes
        service.shiftType = shiftType;
        service.shiftClosed = shiftClosed;
        await service.save();

        // Sending the response with a success message and the updated service
        res.status(200).json({message: 'Service updated', service});
    } catch (err) {
        // Sending the error response if updating service failed
        res.status(500).json({message: 'Error updating service', error: err});
    }
};

// Async function to delete a service by id
exports.deleteService = async (req, res) => {
    const {id} = req.params;
    try {
// Finding a service with the provided id
        const service = await Service.findByPk(id);

        // Sending a not found error response if the service doesn't exist
        if (!service) {
            return res.status(404).json({message: 'Service not found'});
        }

        // Deleting the service
        await service.destroy();

        // Sending the response with a success message
        res.status(200).json({message: 'Service deleted'});
    } catch (err) {
        // Sending the error response if deleting service failed
        res.status(500).json({message: 'Error deleting service', error: err});
    }
};

// This module exports all the above-defined functions for use in other files.
