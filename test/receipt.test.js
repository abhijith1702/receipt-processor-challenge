const request = require('supertest');
import  app from '../src/app';

describe('Receipt Processor API', () => {
    it('should process a valid receipt and return an ID', async () => {
      const receipt = {
        retailer: "Target",
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: [
          { shortDescription: "Mountain Dew 12PK", price: "6.49" },
          { shortDescription: "Emils Cheese Pizza", price: "12.25" },
        ],
        total: "35.35",
      };
      const res = await request(app).post('/receipts/process').send(receipt);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(typeof res.body.id).toBe('string'); // Ensure ID is a string
    });
  
    it('should return 400 for an invalid receipt', async () => {
      const receipt = { retailer: "Target" }; // Missing required fields
      const res = await request(app).post('/receipts/process').send(receipt);
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Please verify input.');
    });
  
    it('should return points for a valid receipt ID', async () => {
      const receipt = {
        retailer: "Target",
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: [
          { shortDescription: "Mountain Dew 12PK", price: "6.49" },
          { shortDescription: "Emils Cheese Pizza", price: "12.25" },
        ],
        total: "35.35",
      };
      const processRes = await request(app).post('/receipts/process').send(receipt);
      const { id } = processRes.body;
      const pointsRes = await request(app).get(`/receipts/${id}/points`);
      expect(pointsRes.statusCode).toEqual(200);
      expect(pointsRes.body).toHaveProperty('points');
      expect(typeof pointsRes.body.points).toBe('number'); // Ensure points is a number
    });
  
    it('should return 404 for an invalid receipt ID', async () => {
      const res = await request(app).get('/receipts/invalid-id/points');
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual('No receipt found for that ID.');
    });
  });
  