require('dotenv').config()
const jwt=require("jsonwebtoken")
const jwt_secure=process.env.JWT_PASSWORD
const verify= async(req,res)=>{
const accessToken=req.cookies.accessToken
if(!accessToken){
    return(
    tryrefresh(req,res,next)
)}
else{
    jwt.verify(accessToken,jwt_secure,(error,decoded)=>{
if(error){
     return(
    tryrefresh(req,res,next)
)
}else{
     req.username=decoded.username
     next()
}
    })
}

}
 const tryrefresh= async(req,res,next)=>{
  const refreshToken=req.cookies.refreshToken
  if(!refreshToken){
     return res.redirect("/api/login");
  }
  else{
    jwt.verify(refreshToken,jwt_secure,(error,decoded)=>{
if(error){
    console.log("invalid token")
}else{
    const playload=({username:decoded.username})
   const newToken=jwt.sign(playload,jwt_secure,{
    expiresIn:"7d"
   })
   res.cookie("accessToken",newToken,{
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "Lax",
    secure: true
   })
   req.username=decoded.username
next()
}
    })
  }


 }
 
module.exports = verify;
// require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const jwt_secure = process.env.JWT_PASSWORD;

// const verify = (req, res, next) => {
//   const accessToken = req.cookies.accessToken;

//   if (!accessToken) {
//     return tryrefresh(req, res, next);
//   }

//   jwt.verify(accessToken, jwt_secure, (err, decoded) => {
//     if (err) {
//       return tryrefresh(req, res, next);
//     }

//     req.username = decoded.username;
//     next();
//   });
// };

// const tryrefresh = (req, res, next) => {
//   const refreshToken = req.cookies.refreshToken;

//   if (!refreshToken) {
//     return res.status(401).json({ message: 'Please log in again' });
//   }

//   jwt.verify(refreshToken, jwt_secure, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: 'Refresh token expired. Please log in again.' });
//     }

//     const payload = { username: decoded.username };
//     const newAccessToken = jwt.sign(payload, jwt_secure, { expiresIn: '15m' });

//     res.cookie('accessToken', newAccessToken, {
//       httpOnly: true,
//       maxAge: 15 * 60 * 1000, 
//       sameSite: 'Lax',
//       secure: false 
//     });

//     req.username = decoded.username;
//     next(); 
//   });
// };

// module.exports = verify;

