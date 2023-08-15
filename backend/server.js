import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { connectDB } from './database/config.js';
import routes from './routes/app.routes.js';
import journeyRouter from './routes/journey.routes.js';
const app = express();

// cors - json
app.use(cors());
app.use(express.json());

// middlewares

// routes
app.use('/api', routes);
app.use('/api', journeyRouter)

connectDB()
  .then((result) => {
    console.log("Mongo db connected.");
  }).catch((err) => {
    console.log("Error connection to mongo db.");
  });

app.listen(process.env.LOCAL_PORT, () => {
  console.log(`Api server listening at :${process.env.LOCAL_PORT}`);
}); 