const {validationResult} = require('express-validator');
const Service = require('../models/services');

exports.createService = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {shiftType, shiftClosed} = req.body;

    try {
        const service = await Service.create({shiftType, shiftClosed});
        res.status(201).json({message: 'Service created', service});
    } catch (err) {
        res.status(500).json({message: 'Error creating service', error: err});
    }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json({services});
    } catch (err) {
        res.status(500).json({message: 'Error fetching services', error: err});
    }
};

exports.getServiceById = async (req, res) => {
    const {id} = req.params;

    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({message: 'Service not found'});
        }

        res.status(200).json({service});
    } catch (err) {
        res.status(500).json({message: 'Error fetching service', error: err});
    }
};

exports.updateService = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {id} = req.params;
    const {shiftType, shiftClosed} = req.body;

    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({message: 'Service not found'});
        }

        service.shiftType = shiftType;
        service.shiftClosed = shiftClosed;
        await service.save();

        res.status(200).json({message: 'Service updated', service});
    } catch (err) {
        res.status(500).json({message: 'Error updating service', error: err});
    }
};

exports.deleteService = async (req, res) => {
    const {id} = req.params;

    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({message: 'Service not found'});
        }

        await service.destroy();
        res.status(200).json({message: 'Service deleted'});
    } catch (err) {
        res.status(500).json({message: 'Error deleting service', error: err});
    }
};
