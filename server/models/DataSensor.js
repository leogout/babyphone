const mongoose = require('mongoose')
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
    type: Schema.ObjectId,
    required: true,
    ref: 'Babyphone'
  }
})

module.exports = mongoose.model('DataSensor', DataSensorSchema)
