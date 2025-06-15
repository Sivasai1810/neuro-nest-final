const express=require("express")
const router=express.Router()
const verifyToken=require('../middlewares/verify');
router.use(express.json())
router.get("/", verifyToken, (req, res) => {
  res.json({ message: "Profile loaded", user: req.username });

});
module.exports=router