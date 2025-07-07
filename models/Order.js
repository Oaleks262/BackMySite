const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'draft' },
  selectedTemplate: String,
  blocks: { type: Object, default: {} },
  confirmed: { type: Boolean, default: false },
  pdfUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
