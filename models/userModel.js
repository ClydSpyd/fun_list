const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  userName:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required:true
  },
  avatar:{
    type: String,
    default:'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295430__340.png'
  },
  date:{
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('user', UserSchema)