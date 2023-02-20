const mongoose=require('mongoose');

const users = mongoose.Schema({
  nameUsers: {
    type: String,
  },
  emailUsers: {
    type: String,
  },
  passwordUsers: {
    type: String,
  },
});

module.exports=mongoose.model('users',users)