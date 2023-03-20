const {validationResult} = require('express-validator');
const Tip = require('../models/tabletips');
const {Op} = require("sequelize");

function getMonthStartEndDates() {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    return { startOfMonth, endOfMonth };
}

function getWeekStartEndDates() {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1)));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return { startOfWeek, endOfWeek };
}

exports.createTip = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {tips, id_restaurantTable, id_service} = req.body;

    try {
        const tip = await Tip.create({tips, id_restaurantTable, id_service});
        res.status(201).json({message: 'Tip created', tip});
    } catch (err) {
        res.status(500).json({message: 'Error creating tip', error: err});
    }
};

exports.getTips = async (req, res) => {
    try {
        const tips = await Tip.findAll();
        res.status(200).json({tips});
    } catch (err) {
        res.status(500).json({message: 'Error fetching tips', error: err});
    }
};

exports.getTipById = async (req, res) => {
    const {id} = req.params;

    try {
        const tip = await Tip.findByPk(id);
        if (!tip) {
            return res.status(404).json({message: 'Tip not found'});
        }

        res.status(200).json({tip});
    } catch (err) {
        res.status(500).json({message: 'Error fetching tip', error: err});
    }
};

exports.updateTip = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {id} = req.params;
    const {tips, id_restaurantTable, id_service} = req.body;

    try {
        const tip = await Tip.findByPk(id);
        if (!tip) {
            return res.status(404).json({message: 'Tip not found'});
        }

        tip.tips = tips;
        tip.id_restaurantTable = id_restaurantTable;
        tip.id_service = id_service;
        await tip.save();

        res.status(200).json({message: 'Tip updated', tip});
    } catch (err) {
        res.status(500).json({message: 'Error updating tip', error: err});
    }
};

exports.deleteTip = async (req, res) => {
    const {id} = req.params;

    try {
        const tip = await Tip.findByPk(id);
        if (!tip) {
            return res.status(404).json({message: 'Tip not found'});
        }

        await tip.destroy();
        res.status(200).json({message: 'Tip deleted'});
    } catch (err) {
        res.status(500).json({message: 'Error deleting tip', error: err});
    }
};

exports.getMonthlyTipsTotal = async (req, res) => {
    const { startOfMonth, endOfMonth } = getMonthStartEndDates();

    try {
        const total = await Tip.sum('tips', {
            where: {
                created_at: {
                    [Op.between]: [startOfMonth, endOfMonth],
                },
            },
        });

        res.status(200).json({ total });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching monthly tips total', error: err });
    }
};

exports.getWeeklyTipsTotal = async (req, res) => {
    const { startOfWeek, endOfWeek } = getWeekStartEndDates();

    try {
        const total = await Tip.sum('tips', {
            where: {
                created_at: {
                    [Op.between]: [startOfWeek, endOfWeek],
                },
            },
        });

        res.status(200).json({ total });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching weekly tips total', error: err });
    }
};
