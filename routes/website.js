const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { auth: authMiddleware, isAdmin: adminMiddleware } = require('../middleware/auth');
const Order = require('../models/Order');

// Generate website for paid order
router.post('/generate/:orderId', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (order.status !== 'paid') {
      return res.status(400).json({ message: 'Order must be paid to generate website' });
    }

    // Generate website based on template and configuration
    const websiteData = await generateWebsite(order);
    
    // Save website files
    const websiteDir = path.join(__dirname, '../generated-websites', order._id.toString());
    if (!fs.existsSync(websiteDir)) {
      fs.mkdirSync(websiteDir, { recursive: true });
    }

    // Save HTML file
    fs.writeFileSync(path.join(websiteDir, 'index.html'), websiteData.html);
    
    // Save CSS file
    fs.writeFileSync(path.join(websiteDir, 'style.css'), websiteData.css);
    
    // Save JavaScript file (if any)
    if (websiteData.js) {
      fs.writeFileSync(path.join(websiteDir, 'script.js'), websiteData.js);
    }

    // Update order with website URL
    order.websiteUrl = `/generated-websites/${order._id}/index.html`;
    order.status = 'completed';
    await order.save();

    res.json({ 
      message: 'Website generated successfully', 
      websiteUrl: order.websiteUrl,
      order: order 
    });
  } catch (error) {
    console.error('Website generation error:', error);
    res.status(500).json({ message: 'Failed to generate website' });
  }
});

// Get generated website
router.get('/view/:orderId', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (!order.websiteUrl) {
      return res.status(404).json({ message: 'Website not generated yet' });
    }

    const websiteDir = path.join(__dirname, '../generated-websites', order._id.toString());
    const htmlFile = path.join(websiteDir, 'index.html');
    
    if (!fs.existsSync(htmlFile)) {
      return res.status(404).json({ message: 'Website files not found' });
    }

    res.sendFile(htmlFile);
  } catch (error) {
    console.error('Website view error:', error);
    res.status(500).json({ message: 'Failed to load website' });
  }
});

// Download website files as ZIP
router.get('/download/:orderId', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (!order.websiteUrl) {
      return res.status(404).json({ message: 'Website not generated yet' });
    }

    const websiteDir = path.join(__dirname, '../generated-websites', order._id.toString());
    
    if (!fs.existsSync(websiteDir)) {
      return res.status(404).json({ message: 'Website files not found' });
    }

    // Create zip archive (simplified - in production use archiver library)
    const files = fs.readdirSync(websiteDir);
    const zipData = {
      files: files.map(filename => ({
        name: filename,
        content: fs.readFileSync(path.join(websiteDir, filename), 'utf8')
      }))
    };

    res.json({ 
      message: 'Website files ready for download', 
      files: zipData.files 
    });
  } catch (error) {
    console.error('Website download error:', error);
    res.status(500).json({ message: 'Failed to prepare download' });
  }
});

// Admin: Update website status
router.put('/status/:orderId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const validStatuses = ['paid', 'in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Status updated successfully', order });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
});

// Helper function to generate website based on template and configuration
async function generateWebsite(order) {
  const { selectedTemplate, blocks } = order;
  
  let html = '';
  let css = '';
  let js = '';

  switch (selectedTemplate) {
    case 'single':
      return generateSinglePageWebsite(blocks);
    case 'landing':
      return generateLandingWebsite(blocks);
    case 'blog':
      return generateBlogWebsite(blocks);
    default:
      throw new Error('Invalid template');
  }
}

function generateSinglePageWebsite(blocks) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${blocks.businessName || 'Your Business'}</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <header class="header">
        <div class="container">
          <h1 class="logo">${blocks.businessName || 'Your Business'}</h1>
          <nav class="nav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section id="home" class="hero">
        <div class="container">
          <h1>${blocks.heroTitle || 'Welcome to Our Business'}</h1>
          <p>${blocks.heroDescription || 'We provide excellent services to help your business grow'}</p>
          <a href="#contact" class="btn">Get Started</a>
        </div>
      </section>

      <section id="about" class="about">
        <div class="container">
          <h2>About Us</h2>
          <p>${blocks.aboutText || 'We are a professional team dedicated to providing exceptional services...'}</p>
        </div>
      </section>

      <section id="services" class="services">
        <div class="container">
          <h2>Our Services</h2>
          <div class="services-grid">
            ${generateServicesHTML(blocks.services)}
          </div>
        </div>
      </section>

      <section id="contact" class="contact">
        <div class="container">
          <h2>Contact Us</h2>
          <div class="contact-info">
            <p><strong>Email:</strong> ${blocks.contactEmail || 'info@example.com'}</p>
            <p><strong>Phone:</strong> ${blocks.contactPhone || '+1 (555) 123-4567'}</p>
            <p><strong>Address:</strong> ${blocks.contactAddress || '123 Business St, City, State 12345'}</p>
          </div>
          <form class="contact-form">
            <input type="text" placeholder="Your Name" required>
            <input type="email" placeholder="Your Email" required>
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit" class="btn">Send Message</button>
          </form>
        </div>
      </section>

      <footer class="footer">
        <div class="container">
          <p>&copy; 2024 ${blocks.businessName || 'Your Business'}. All rights reserved.</p>
        </div>
      </footer>

      <script src="script.js"></script>
    </body>
    </html>
  `;

  const css = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .header {
      background: #fff;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 1000;
    }

    .header .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 20px;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #667eea;
    }

    .nav a {
      text-decoration: none;
      color: #333;
      margin-left: 2rem;
      font-weight: 500;
    }

    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 150px 0 100px;
      text-align: center;
      margin-top: 80px;
    }

    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .hero p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .btn {
      display: inline-block;
      background: #fff;
      color: #333;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      transition: all 0.3s;
      border: none;
      cursor: pointer;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    .about, .services, .contact {
      padding: 80px 0;
    }

    .about {
      background: #f8f9fa;
    }

    .about h2, .services h2, .contact h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .service-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      text-align: center;
    }

    .contact {
      background: #f8f9fa;
    }

    .contact-info {
      text-align: center;
      margin-bottom: 3rem;
    }

    .contact-info p {
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    .contact-form {
      max-width: 600px;
      margin: 0 auto;
    }

    .contact-form input,
    .contact-form textarea {
      width: 100%;
      padding: 12px;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
    }

    .contact-form textarea {
      height: 150px;
      resize: vertical;
    }

    .footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 2rem 0;
    }

    @media (max-width: 768px) {
      .header .container {
        flex-direction: column;
        gap: 1rem;
      }

      .nav a {
        margin: 0 1rem;
      }

      .hero h1 {
        font-size: 2rem;
      }

      .hero p {
        font-size: 1rem;
      }

      .services-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  const js = `
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Contact form submission
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
      const header = document.querySelector('.header');
      if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
      } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
      }
    });
  `;

  return { html, css, js };
}

function generateLandingWebsite(blocks) {
  // Similar structure but for landing page template
  // This would be more complex with multiple pages
  return generateSinglePageWebsite(blocks);
}

function generateBlogWebsite(blocks) {
  // Blog template generation
  return generateSinglePageWebsite(blocks);
}

function generateServicesHTML(services) {
  if (!services || !Array.isArray(services)) {
    return `
      <div class="service-card">
        <h3>Service 1</h3>
        <p>Description of your first service</p>
      </div>
      <div class="service-card">
        <h3>Service 2</h3>
        <p>Description of your second service</p>
      </div>
      <div class="service-card">
        <h3>Service 3</h3>
        <p>Description of your third service</p>
      </div>
    `;
  }

  return services.map(service => `
    <div class="service-card">
      <h3>${service.name || 'Service'}</h3>
      <p>${service.description || 'Service description'}</p>
    </div>
  `).join('');
}

module.exports = router;