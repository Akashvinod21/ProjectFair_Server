const jwt = require('jsonwebtoken')

const jwtMiddleware = async(req,res,next)=>{
    console.log('Inside jwtMiddleware');
    
    const token = req.headers["authorization"].split(' ')[1]
    console.log(token);

    try {
        const jwtResponse = jwt.verify(token,"secretkey")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
        
        
    } catch (error) {
        res.status(401).json('Authorization failed')  
    }
    
}

module.exports = jwtMiddleware
