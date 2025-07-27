const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
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
const signatureRoutes = require('./routes/signature');
const settingsRoutes = require('./routes/settings');
const reviewRoutes = require('./routes/reviews');

// Load environment variables
const envResult = dotenv.config();


if (envResult.error) {
  console.error('❌ Error loading .env file:', envResult.error);
  console.log('Current working directory:', process.cwd());
  console.log('Looking for .env file at:', require('path').resolve('.env'));
} else {
  console.log('✅ .env file loaded successfully');
}

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  console.log('Available environment variables:', Object.keys(process.env).filter(key => key.startsWith('MONGO') || key.startsWith('JWT') || key.startsWith('PORT')));
  process.exit(1);
}

console.log('✅ All required environment variables are present');
console.log('Port:', process.env.PORT || 4444);
console.log('MongoDB URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
console.log('JWT Secret:', process.env.JWT_SECRET ? 'Set' : 'Not set');

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use('/api/auth/login', authLimiter);

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

app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});

app.get('/settings.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});

app.get('/review/:orderId', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'review.html'));
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
app.use('/api/signature', signatureRoutes);
app.use('/api/admin/settings', settingsRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/generated-websites', express.static(path.join(__dirname, 'generated-websites')));

// Catch-all handler: serve index.html for all other routes (SPA fallback)
app.get('*', (req, res) => {
  // Check if it's an API route
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  // Check if it's a specific page that should have its own file
  if (req.path === '/admin' || req.path === '/admin.html') {
    return res.sendFile(path.join(__dirname, 'public', 'admin.html'));
  }
  if (req.path === '/dashboard' || req.path === '/dashboard.html') {
    return res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
  }
  // For all other routes, serve index.html (for SPA routing)
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ message: 'Something went wrong!' });
});

console.log('🔄 Connecting to MongoDB...');
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    const port = process.env.PORT || 4444;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📍 API available at: http://localhost:${port}/api/`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.error('Check your MONGO_URI in .env file');
    process.exit(1);
  });
