import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/app.routes.js';
import { connectDB } from './database/config.js';
dotenv.config();
const app = express();

// cors - json
app.use(cors());
app.use(express.json());

// middlewares

// routes
app.use('/api', routes);

connectDB()
  .then((result) => {
    console.log("Mongo db connected.");
  }).catch((err) => {
    console.log("Error connection to mongo db.");
  });

app.listen(process.env.LOCAL_PORT, () => {
  console.log(`Api server listening at :${process.env.LOCAL_PORT}`);
}); 