const {Admin} = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret = 'your-secret-key';

// Create an admin
exports.create = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const admin = await Admin.create({
            ...req.body,
            password: hashedPassword,
        });
        res.status(201).send(admin);
    } catch (error) {
        res.status(500).send({message: 'Error creating admin', error});
    }
};

// Authenticate an admin and generate a JWT token
exports.login = async (req, res) => {
    try {
        const admin = await Admin.findOne({where: {email: req.body.email}});

        if (!admin) {
            res.status(404).send({message: 'Admin not found'});
            return;
        }

        const passwordMatch = await bcrypt.compare(req.body.password, admin.password);

        if (!passwordMatch) {
            res.status(401).send({message: 'Invalid password'});
            return;
        }

        const token = jwt.sign({id: admin.id, email: admin.email}, secret, {expiresIn: '1h'});

        res.send({message: 'Authenticated', token});
    } catch (error) {
        res.status(500).send({message: 'Error authenticating admin', error});
    }
};

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).send({message: 'No token provided'});
        return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401).send({message: 'Invalid token'});
        return;
    }

    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            res.status(401).send({message: 'Unauthorized', error});
            return;
        }

        req.adminId = decoded.id;
        next();
    });
};
