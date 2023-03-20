const { validationResult } = require('express-validator');
const User = require('../models/users');

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, status, active } = req.body;

    try {
        const user = await User.create({ firstname, lastname, status, active });
        res.status(201).json({ message: 'User created', user });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err });
    }
};

exports.updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { firstname, lastname, status, active } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstname = firstname;
        user.lastname = lastname;
        user.status = status;
        user.active = active;
        await user.save();

        res.status(200).json({ message: 'User updated', user });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err });
    }
};

exports.deactivateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.active = 0; // Set user as inactive
        await user.save();
        res.status(200).json({ message: 'User deactivated' });
    } catch (err) {
        res.status(500).json({ message: 'Error deactivating user', error: err });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
};
