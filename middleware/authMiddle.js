const jwt = require("jsonwebtoken")


module.exports = function(req, res, next) {

  const { auth_token: token } = req.cookies

  if(!token) {
    return res.status(401).json({
      msg: 'no token received, authorisation denied'
    })
  } 

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded._doc._id
    next() 

  } catch (err) {
    
    res.status(401).json({
      msg:'token is not valid'
    })

  }
}