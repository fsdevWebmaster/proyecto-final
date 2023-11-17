import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { connectDB } from './database/config.js';
import routes from './routes/app.routes.js';
import journeyRouter from './routes/journey.routes.js';
import containerRouter from './routes/container.routes.js';
// import { socketApp } from './socket-server.js';
import cookieParser from 'cookie-parser';
import { initSocketEvents } from './socket/socketEvents.js';

dotenv.config();
const app = express();

// cors - json
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api', routes);
app.use('/api', journeyRouter);
app.use('/api', containerRouter);

// error handling
app.use((err, req, res, next) => {
  let message = "Server error"
  res.status(500)
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


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

initSocketEvents(io);

const PORT = process.env.LOCAL_PORT || 8000;

server.listen(PORT, () => {
  console.log(`Api server listening on Port: ${PORT}`);
});
