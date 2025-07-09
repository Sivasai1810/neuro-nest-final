import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import models from './db.js';
const { connectdb } = models;
import createroute from './routes/create.js';
import loginroute from './routes/login.js';
import dashboardroute from './routes/dashboard.js';
import apibot from './routes/apibot.js';
import todo from './routes/todo.js';
import notes from './routes/notes.js';
import pdf from './routes/pdf.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

try {
  connectdb();
  app.use('/api/create', createroute);
  app.use('/api/login', loginroute);
  app.use('/api/dashboard', dashboardroute);
  app.use('/gemini', apibot);
  app.use('/todo', todo); 
  app.use('/notes', notes);
  app.use('/pdf', pdf);
  console.log("somthingggggggg is wrong ");
} catch (error) {
  console.log("somthin is wrong ", error);
}

const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
