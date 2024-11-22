import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import authRoutes from './routes/auth/authRoutes';

// Load environment variables
dotenv.config();

// Initialize the Express application
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Swagger options
const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Laundry App API',
      version: '1.0.0',
      description: 'API for On-Demand Laundry Application',
    },
  },
  apis: ['./src/routes/**/*.ts'], // Adjust based on your source folder
};

// Swagger setup
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the On-Demand Laundry App API!');
});

// Database connection
const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/laundry-app';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Start the server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
});
