const jwt = require("jsonwebtoken")


module.exports = function(req, res, next) {

  // const { auth_token: token } = req.cookies
  const token = req.header('x-auth-token')

  if(!token) {
    return res.status(401).json({
      msg: 'no token received, authorisation denied'
    })
  } 

  try {
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    req.userId = decoded._doc._id
    next() 

  } catch (err) {
    
    res.status(401).json({
      msg:'token is not valid'
    })

  }
}