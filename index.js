const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const contactRoutes = require('./routes/contact');
const paymentRoutes = require('./routes/payment');
const uploadRoutes = require('./routes/upload');
const templateRoutes = require('./routes/templates');
const profileRoutes = require('./routes/profile');
const websiteRoutes = require('./routes/website');
const adminRoutes = require('./routes/admin');

dotenv.config();
const app = express();

app.use(cors());
// Raw body parser for Stripe webhooks
app.use('/api/payment/webhook', express.raw({type: 'application/json'}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/website', websiteRoutes);
app.use('/api/admin', adminRoutes);
app.use('/generated-websites', express.static(path.join(__dirname, 'generated-websites')));

// Catch-all handler: serve index.html for all other routes (SPA fallback)
app.get('*', (req, res) => {
  // Check if it's an API route
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  // For all other routes, serve index.html (for SPA routing)
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ message: 'Something went wrong!' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running')))
  .catch(err => console.error(err));
