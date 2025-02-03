import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './utils/swagger.js'; 
import { ReceiptController } from './controllers/ReceiptController.js';

const app = express();
app.use(express.json());




// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.post('/receipts/process', ReceiptController.processReceipt);
app.get('/receipts/:id/points', ReceiptController.getPoints);


// app.post('/receipts/process', authMiddleware, ReceiptController.processReceipt);
// app.get('/receipts/:id/points',authMiddleware, ReceiptController.getPoints);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

//JWT middleware
const authMiddleware = async (req, res, next) => {
  // Get the token from the authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

  try {
    // Verify the JWT
    const decoded = await verifyJWT(token);
    req.user = decoded;  // Store the decoded user info in the request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default app;