const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/, 'Please provide a valid email address.']
  },
  babyphone: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Babyphone'
  }
})

UserSchema.pre('save', function(next) {
  if (!this.isModified('password') && !this.isNew)
    return next()

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err)
      return next(err)

    this.password = hash
    next()
  })
})

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
