const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports  = (req,res,next) => {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json({message: `Access denied. No token provided`});

    try{
        const decodePayLoad = jwt.verify(token,process.env.JWT_PRIVATE_KEY);

        req.user = decodePayLoad;
        next();
    }
    catch(err){
        res.status(400).json({message: 'Invalid Token.'});
    }
}