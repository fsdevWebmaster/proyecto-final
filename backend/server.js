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

// error handling
app.use((err, req, res, next) => {
  let message = "Server error"
  
  if (
    err.message.includes("validation failed") || 
    err.message.includes("is not valid JSON") ||
    err.message.includes("Cast to ObjectId failed") ||
    err.message.includes("Missing data") 
  ) {
    message = "Wrong or missing data"
    res.status(400)
  }
  if (err.message.includes("E11000 duplicate key error")) {
    message = "Item already exists"
    res.status(406)
  }
  if (err.message.includes("Not found")) {
    message = "Item not found"
    res.status(404)
  }
  return res.json({ message })
})

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
