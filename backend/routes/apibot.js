import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const router = express.Router();
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
router.use(express.json());
const allowedOrigins = [
  "https://neuro-nest-final-1.onrender.com",
  'http://localhost:5173'
];

router.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
router.use(bodyParser.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

router.post('/', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
       model: "mistralai/mixtral-8x7b-instruct",
        messages: [
          { role: "system", content: "You are a helpful chatbot." },
          { role: "user", content: userMessage }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices?.[0]?.message?.content || "No reply received.";
    res.json({ reply });

  } catch (error) {
    console.error("Error calling OpenRouter:", error.message);
    res.status(500).json({ reply: "API Error" });
  }
});
export default router;



