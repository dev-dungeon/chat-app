var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }]
});

userSchema.methods.comparePassword = function (candidatePassword, next) {
  next(null, candidatePassword === this.password);
};

var User = mongoose.model('User', userSchema);
module.exports = User;
