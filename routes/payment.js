const express = require('express');
const router = express.Router();
const stripe = process.env.STRIPE_SECRET_KEY ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;
const { auth: authMiddleware } = require('../middleware/auth');
const Order = require('../models/Order');

// Create payment intent
router.post('/create-payment-intent', authMiddleware, async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ message: 'Payment system not configured' });
    }
    
    const { orderId } = req.body;
    
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Calculate amount based on selected template and features
    let amount = 0;
    if (order.selectedTemplate === 'single') {
      amount = 50000; // $500 in cents
    } else if (order.selectedTemplate === 'landing') {
      amount = 100000; // $1000 in cents
    } else if (order.selectedTemplate === 'blog') {
      amount = 150000; // $1500 in cents
    }

    // Add additional features cost
    if (order.blocks && order.blocks.additionalFeatures) {
      const features = order.blocks.additionalFeatures;
      if (features.includes('ecommerce')) amount += 50000;
      if (features.includes('booking')) amount += 30000;
      if (features.includes('analytics')) amount += 20000;
      if (features.includes('seo')) amount += 25000;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      metadata: {
        orderId: order._id.toString(),
        userId: req.user.id
      }
    });

    // Update order with payment intent
    order.paymentIntentId = paymentIntent.id;
    order.amount = amount;
    await order.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: amount
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
});

// Handle successful payment
router.post('/confirm-payment', authMiddleware, async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ message: 'Payment system not configured' });
    }
    
    const { paymentIntentId } = req.body;
    
    const order = await Order.findOne({ paymentIntentId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      order.status = 'paid';
      order.paidAt = new Date();
      await order.save();
      
      res.json({ 
        message: 'Payment confirmed', 
        order: {
          id: order._id,
          status: order.status,
          paidAt: order.paidAt
        }
      });
    } else {
      res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ message: 'Failed to confirm payment' });
  }
});

// Stripe webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ message: 'Payment system not configured' });
  }
  
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      
      // Update order status
      const order = await Order.findOne({ paymentIntentId: paymentIntent.id });
      if (order) {
        order.status = 'paid';
        order.paidAt = new Date();
        await order.save();
      }
      break;
    
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      
      // Update order status
      const failedOrder = await Order.findOne({ paymentIntentId: failedPayment.id });
      if (failedOrder) {
        failedOrder.status = 'payment_failed';
        await failedOrder.save();
      }
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Get pricing information
router.get('/pricing', (req, res) => {
  const pricing = {
    single: {
      basePrice: 500,
      description: 'Single page website with basic features',
      features: ['Responsive design', 'Contact form', 'Basic SEO']
    },
    landing: {
      basePrice: 1000,
      description: 'Multi-page landing website',
      features: ['Up to 4 pages', 'Advanced design', 'Contact integration', 'Social media links']
    },
    blog: {
      basePrice: 1500,
      description: 'Full blog website with CMS',
      features: ['Blog functionality', 'Admin panel', 'Content management', 'SEO optimization']
    },
    additionalFeatures: {
      ecommerce: { price: 500, description: 'E-commerce functionality' },
      booking: { price: 300, description: 'Booking system' },
      analytics: { price: 200, description: 'Analytics integration' },
      seo: { price: 250, description: 'Advanced SEO optimization' }
    }
  };

  res.json(pricing);
});

module.exports = router;