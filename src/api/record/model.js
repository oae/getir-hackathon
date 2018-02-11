const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  key: String,
  value: String,
  createdAt: Date,
  counts: [Number]
});

module.exports = mongoose.model('record', RecordSchema);