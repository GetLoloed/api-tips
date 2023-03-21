const express = require('express');
const { body } = require('express-validator');
const tipsController = require('../controllers/tipsController');

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new tip
 *     tags: [Tips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tips
 *               - id_restaurantTable
 *               - id_service
 *             properties:
 *               tips:
 *                 type: integer
 *               id_restaurantTable:
 *                 type: integer
 *               id_service:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tip created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post(
    '/',
    [
        body('tips').isInt().withMessage('Tips must be an integer'),
        body('id_restaurantTable')
            .isInt()
            .withMessage('Restaurant table ID must be an integer'),
        body('id_service').isInt().withMessage('Service ID must be an integer')
    ],
    tipsController.createTip
);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of tips
 *     tags: [Tips]
 *     responses:
 *       200:
 *         description: A list of tips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tip'
 *       500:
 *         description: Internal server error
 */
router.get('/', tipsController.getTips);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a tip by ID
 *     tags: [Tips]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the tip to retrieve
 *     responses:
 *       200:
 *         description: A tip object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tip'
 *       404:
 *         description: Tip not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', tipsController.getTipById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a tip by ID
 *     tags: [Tips]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the tip to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tips:
 *                 type: integer
 *               id_restaurantTable:
 *                 type: integer
 *               id_service:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tip updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Tip not found
 *       500:
 *         description: Internal server error
 */
router.put(
    '/:id',
    [
        body('tips')        .isInt()
            .withMessage('Tips must be an integer'),
        body('id_restaurantTable')
            .isInt()
            .withMessage('Restaurant table ID must be an integer'),
        body('id_service').isInt().withMessage('Service ID must be an integer'),
    ],
    tipsController.updateTip
);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a tip by ID
 *     tags: [Tips]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the tip to delete
 *     responses:
 *       200:
 *         description: Tip deleted successfully
 *       404:
 *         description: Tip not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', tipsController.deleteTip);

/**
 * @swagger
 * /total/month:
 *   get:
 *     summary: Retrieve the total tips for the current month
 *     tags: [Tips]
 *     responses:
 *       200:
 *         description: Monthly tips total
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.get('/total/month', tipsController.getMonthlyTipsTotal);

/**
 * @swagger
 * /total/week:
 *   get:
 *     summary: Retrieve the total tips for the current week
 *     tags: [Tips]
 *     responses:
 *       200:
 *         description: Weekly tips total
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.get('/total/week', tipsController.getWeeklyTipsTotal);

module.exports = router;

