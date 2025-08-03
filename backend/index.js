import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectdb from './db.js';
import createroute from './routes/create.js';
import loginroute from './routes/login.js';
import dashboardroute from './routes/dashboard.js';
import apibot from './routes/apibot.js';
import todo from './routes/todo.js';
import notes from './routes/notes.js';
import pdf from './routes/pdf.js';
import folder from './routes/folders.js';
import storename from './routes/storename.js'
import showpdfs from './routes/showpdfs.js'
import server from "./routes/livechat.js"

const app = express();
const allowedOrigins = [
  "https://neuro-nest-final-5khb.vercel.app",
  'http://localhost:5173'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
  app.use('/get-signed-url',folder);
  app.use('/callingfiles',storename);
  app.use('/alignpdf',showpdfs)
} catch (error) {
  console.log("somthin is wrong ", error);
}

const port = process.env.PORT;
server.listen(port, () => console.log(`Example app listening on port ${port}!`));
