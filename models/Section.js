const { Schema, model } = require('mongoose');

const sectionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  image: { type: String }, // URL до картинки, якщо є
  order: { type: Number, default: 0 }, // для сортування
});

module.exports = model('Section', sectionSchema);
