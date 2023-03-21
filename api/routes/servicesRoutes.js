const express = require('express');
const {body} = require('express-validator');
const servicesController = require('../controllers/servicesController');

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shiftType
 *               - shiftClosed
 *             properties:
 *               shiftType:
 *                 type: integer
 *               shiftClosed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post(
    '/',
    [
        body('shiftType')
            .isInt()
            .withMessage('Shift type must be an integer'),
        body('shiftClosed')
            .isBoolean()
            .withMessage('Shift closed must be a boolean')
    ],
    servicesController.createService
);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: A list of services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       500:
 *         description: Internal server error
 */
router.get('/', servicesController.getServices);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the service to retrieve
 *     responses:
 *       200:
 *         description: A service object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', servicesController.getServiceById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the service to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shiftType:
 *                 type: integer
 *               shiftClosed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.put(
    '/:id',
    [
        body('shiftType')
            .isInt()
            .withMessage('Shift type must be an integer'),
        body('shiftClosed')
            .isBoolean()
            .withMessage('Shift closed must be a boolean')
    ],
    servicesController.updateService
);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the service to delete
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', servicesController.deleteService);

module.exports = router;
