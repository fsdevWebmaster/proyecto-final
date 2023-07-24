import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import routes from './routes/app.routes.js';
import { connectDB } from './database/config.js';

const app = express();

// cors - json
app.use(cors());
app.use(express.json());

// middlewares

// routes
app.use('/api', routes);

connectDB().then((result) => {
  app.listen(process.env.PORT, () => {
    console.log(`Api server listening at :${process.env.PORT}`);
  }); 
}).catch((err) => {
  console.log('Error handling:', err);
});
