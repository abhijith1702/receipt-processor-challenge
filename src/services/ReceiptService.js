import { v4 as uuidv4 } from 'uuid';         
import ReceiptModel from '../models/ReceiptModel.js'; 
import {Receipt} from '../utils/Receipt.js'; 
import Logger from '../utils/Logger.js';
  
class ReceiptService {
  static processReceipt(receiptData) {
    try{
    const id = uuidv4(); 
    Logger.info('saving receipt to database');
    const receipt = new Receipt(receiptData);
    ReceiptModel.saveReceipt(id, receipt);
    return id;
    }catch(error){
    Logger.error('Error processing receipt ' + error.message);
    throw new Error('Failed to process receipt');
    }
  }

  static getPoints(id) {
    try{
    const receiptData = ReceiptModel.getReceipt(id);
    if (!receiptData) return null;
    const receipt = new Receipt(receiptData); 
    Logger.info('getting receipt to database');
    return receipt.calculatePoints();
    }catch(error){
      Logger.error('Error calculating points ' + error.message);
      throw new Error('Failed to calculate points');
    }
  }
}

export { ReceiptService };
