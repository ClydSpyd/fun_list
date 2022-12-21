const mongoose = require("mongoose")

const ListItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required:true
  },
  link: {
    type: String,
  },
  imgLink: {
    type: String,
    default:'https://thumbs.dreamstime.com/b/logo-teamwork-business-people-icon-white-background-vector-illustration-logo-teamwork-business-people-hug-fellowship-115612616.jpg'
  },
  complete: {
    type: Boolean,
    default: false
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true
  },
  dateSubmitted: {
    type: Date,
    default: Date.now
  }
})

module.exports = ListItem = mongoose.model('listItem', ListItemSchema)