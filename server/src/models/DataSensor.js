const mongoose = require('mongoose')
const Babyphone = require('./Babyphone')
const Schema = mongoose.Schema

const DataSensorSchema = new Schema({
  savedAt: {
    type: Date,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: String,
    required: true
  },
  gyroscope: {
    type: String,
    required: true
  },
  babyphone: {
    type: Babyphone.Types.ObjectId,
    required: true
  }
})

module.exports = mongoose.model('DataSensor', DataSensorSchema)
