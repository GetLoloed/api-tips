const express = require('express');
const {body} = require('express-validator');
const usersController = require('../controllers/usersController');
const adminController = require('../controllers/adminController');

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - status
 *               - active
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               status:
 *                 type: boolean
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
    '/',
    adminController.verifyToken,
    [
        body('firstname').notEmpty().withMessage('Firstname is required'),
        body('lastname').notEmpty().withMessage('Lastname is required'),
        body('status').isBoolean().withMessage('Status must be a boolean'),
        body('active').isBoolean().withMessage('Active must be a boolean'),
    ],
    usersController.createUser
);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get('/', usersController.getUsers);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', usersController.getUserById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               status:
 *                 type: boolean
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put(
    '/:id',
    adminController.verifyToken,
    [
        body('firstname').notEmpty().withMessage('Firstname is required'),
        body('lastname').notEmpty().withMessage('Lastname is required'),
        body('status').isBoolean().withMessage('Status must be a boolean'),
        body('active').isBoolean().withMessage('Active must be a boolean'),
    ],
    usersController.updateUser
);

/**
 * @swagger
 * /deactivate/{id}:
 *   put:
 *     summary: Deactivate a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to deactivate
 *     responses:
 *       200:
 *         description: User deactivated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/deactivate/:id', adminController.verifyToken, usersController.deactivateUser);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', adminController.verifyToken, usersController.deleteUser);

module.exports = router;
