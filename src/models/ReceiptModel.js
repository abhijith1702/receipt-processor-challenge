class ReceiptModel {
    constructor() {
      this.receipts = new Map();
    }
  
    // Save a receipt
    saveReceipt(id, receipt) {
      this.receipts.set(id, receipt);
    }
  
    // Get a receipt
    getReceipt(id) {
      return this.receipts.get(id) || null;
    }
  }
  
  export default new  ReceiptModel();
  