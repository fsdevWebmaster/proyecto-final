import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { connectDB } from './database/config.js';
import routes from './routes/app.routes.js';
import journeyRouter from './routes/journey.routes.js';
import containerRouter from './routes/container.routes.js';
import { socketApp } from './socket-server.js';
export const app = express();

// cors - json
app.use(cors());
app.use(express.json());

// routes
app.use('/api', routes);
app.use('/api', journeyRouter)
app.use('/api', containerRouter)

connectDB()
  .then((result) => {
    console.log("Mongo db connected.");
  }).catch((err) => {
    console.log("Error connection to mongo db.");
  });

app.listen(process.env.LOCAL_PORT, () => {
  console.log(`Api server listening at :${process.env.LOCAL_PORT}`);
}); 

// socket server
socketApp
