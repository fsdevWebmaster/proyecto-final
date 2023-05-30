import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();

// cors
app.use(cors());

// middlewares

// routes


app.listen(process.env.PORT, () => {
  console.log(`Api server listening at :${process.env.PORT}`);
});