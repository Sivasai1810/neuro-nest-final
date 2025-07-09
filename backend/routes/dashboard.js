import express from "express";
import verifyToken from "../middlewares/verify.js";
const router = express.Router();
router.use(express.json())
router.get("/", verifyToken, (req, res) => {
  res.json({ message: "Profile loaded", user: req.username });

});
export default router;