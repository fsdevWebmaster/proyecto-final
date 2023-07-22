import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/app.routes.js';
dotenv.config();
const app = express();

// cors - json
app.use(cors());
app.use(express.json());

// middlewares

// routes
app.use('/api', routes);


app.listen(process.env.PORT, () => {
  console.log(`Api server listening at :${process.env.PORT}`);
}); 