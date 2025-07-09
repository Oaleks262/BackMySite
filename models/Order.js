const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { 
    type: String, 
    default: 'draft',
    enum: ['draft', 'pending_payment', 'paid', 'in_progress', 'completed', 'cancelled', 'payment_failed']
  },
  selectedTemplate: String,
  tariffType: { 
    type: String, 
    enum: ['single', 'landing', 'blog'],
    default: null
  },
  blocks: { type: Object, default: {} },
  confirmed: { type: Boolean, default: false },
  pdfUrl: String,
  paymentIntentId: String,
  amount: Number,
  paidAt: Date,
  websiteUrl: String,
  uploadedFiles: [{ 
    url: String, 
    filename: String, 
    originalName: String, 
    uploadedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
