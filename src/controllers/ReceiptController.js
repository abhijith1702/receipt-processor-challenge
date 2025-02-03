/**
 * @swagger
 * tags:
 *   name: Receipts
 *   description: Receipt processing and points calculation
 */

/**
 * @swagger
 * /receipts/process:
 *   post:
 *     summary: Submit a receipt for processing
 *     tags: [Receipts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Receipt'
 *     responses:
 *       200:
 *         description: Returns the ID assigned to the receipt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "7fb1377b-b223-49d9-a31a-5a02701dd310"
 *       400:
 *         description: Invalid receipt data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please verify input."
 */

/**
 * @swagger
 * /receipts/{id}/points:
 *   get:
 *     summary: Get points awarded for a receipt
 *     tags: [Receipts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the receipt
 *     responses:
 *       200:
 *         description: Returns the points awarded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 points:
 *                   type: integer
 *                   example: 100
 *       404:
 *         description: Receipt not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No receipt found for that ID."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Receipt:
 *       type: object
 *       required:
 *         - retailer
 *         - purchaseDate
 *         - purchaseTime
 *         - items
 *         - total
 *       properties:
 *         retailer:
 *           type: string
 *           example: "M&M Corner Market"
 *         purchaseDate:
 *           type: string
 *           format: date
 *           example: "2022-01-01"
 *         purchaseTime:
 *           type: string
 *           format: time
 *           example: "13:01"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *         total:
 *           type: string
 *           example: "6.49"
 *     Item:
 *       type: object
 *       required:
 *         - shortDescription
 *         - price
 *       properties:
 *         shortDescription:
 *           type: string
 *           example: "Mountain Dew 12PK"
 *         price:
 *           type: string
 *           example: "6.49"
 */
import { validateReceipt } from '../utils/validation.js';
import {ReceiptService} from '../services/ReceiptService.js'
import Logger from '../utils/Logger.js';

class ReceiptController {
  static processReceipt(req, res) {
    try{
    const { error } = validateReceipt(req.body);
    if (error) {
      return res.status(400).json({ message: 'Please verify input.' });
    }

    const receipt = req.body;
    Logger.info('Receipt processsing');
    const id = ReceiptService.processReceipt(receipt);  
    res.status(200).json({ id });
  }catch(error){
    Logger.error('Error processing receipt' + error.message);
    res.status(500).json({message : 'Internal Server Error'});
  }
  }

  static getPoints(req, res) {
    try{
    const { id } = req.params;
    Logger.info('get points');
    const points = ReceiptService.getPoints(id); 
    if (points === null) {
      return res.status(404).json({ message: 'No receipt found for that ID.' });
    }
    res.status(200).json({ points });
  }catch(error){
    Logger.error( 'Error getting points:' + error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  }
}

export { ReceiptController };


