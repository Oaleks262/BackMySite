const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Template configurations
const templates = {
  single: {
    name: 'Single Page Website',
    description: 'Perfect for personal portfolios, landing pages, or small businesses',
    features: ['Responsive design', 'Contact form', 'Social media integration', 'Basic SEO'],
    preview: '/templates/single/preview.html',
    sections: ['hero', 'about', 'services', 'contact'],
    price: 500
  },
  landing: {
    name: 'Multi-Page Landing Site',
    description: 'Great for businesses that need multiple pages and advanced features',
    features: ['Up to 4 pages', 'Advanced design', 'Contact integration', 'Blog section'],
    preview: '/templates/landing/preview.html',
    sections: ['hero', 'about', 'services', 'portfolio', 'testimonials', 'contact'],
    price: 1000
  },
  blog: {
    name: 'Blog Website',
    description: 'Full-featured blog with content management system',
    features: ['Blog functionality', 'Admin panel', 'Content management', 'SEO optimization'],
    preview: '/templates/blog/preview.html',
    sections: ['hero', 'blog', 'about', 'categories', 'contact'],
    price: 1500
  }
};

// Get all templates
router.get('/', (req, res) => {
  res.json(templates);
});

// Get specific template
router.get('/:templateId', (req, res) => {
  const template = templates[req.params.templateId];
  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }
  res.json(template);
});

// Generate preview HTML for template
router.get('/:templateId/preview', (req, res) => {
  const templateId = req.params.templateId;
  const template = templates[templateId];
  
  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }

  // Generate preview HTML based on template type
  let previewHtml = '';
  
  switch (templateId) {
    case 'single':
      previewHtml = generateSinglePagePreview();
      break;
    case 'landing':
      previewHtml = generateLandingPagePreview();
      break;
    case 'blog':
      previewHtml = generateBlogPreview();
      break;
    default:
      return res.status(404).json({ message: 'Template not found' });
  }

  res.send(previewHtml);
});

// Generate customized preview based on user input
router.post('/:templateId/customize', (req, res) => {
  const templateId = req.params.templateId;
  const { blocks, colors, fonts } = req.body;
  
  const template = templates[templateId];
  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }

  let customizedHtml = '';
  
  switch (templateId) {
    case 'single':
      customizedHtml = generateCustomSinglePage(blocks, colors, fonts);
      break;
    case 'landing':
      customizedHtml = generateCustomLandingPage(blocks, colors, fonts);
      break;
    case 'blog':
      customizedHtml = generateCustomBlogPage(blocks, colors, fonts);
      break;
  }

  res.send(customizedHtml);
});

// Helper functions for generating preview HTML
function generateSinglePagePreview() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Single Page Template Preview</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 0; text-align: center; }
        .hero h1 { font-size: 3em; margin-bottom: 20px; }
        .hero p { font-size: 1.2em; margin-bottom: 30px; }
        .btn { display: inline-block; background: #fff; color: #333; padding: 12px 30px; text-decoration: none; border-radius: 5px; transition: transform 0.3s; }
        .btn:hover { transform: translateY(-2px); }
        
        .about { padding: 80px 0; background: #f8f9fa; }
        .about h2 { text-align: center; font-size: 2.5em; margin-bottom: 50px; }
        .about-content { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; }
        
        .services { padding: 80px 0; }
        .services h2 { text-align: center; font-size: 2.5em; margin-bottom: 50px; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .service-card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center; }
        
        .contact { padding: 80px 0; background: #f8f9fa; }
        .contact h2 { text-align: center; font-size: 2.5em; margin-bottom: 50px; }
        .contact-form { max-width: 600px; margin: 0 auto; }
        .form-group { margin-bottom: 20px; }
        .form-group input, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; }
        
        @media (max-width: 768px) {
          .hero h1 { font-size: 2em; }
          .about-content { grid-template-columns: 1fr; }
          .services-grid { grid-template-columns: 1fr; }
        }
      </style>
    </head>
    <body>
      <section class="hero">
        <div class="container">
          <h1>Your Business Name</h1>
          <p>Professional, modern, and responsive single page website</p>
          <a href="#contact" class="btn">Get Started</a>
        </div>
      </section>

      <section class="about">
        <div class="container">
          <h2>About Us</h2>
          <div class="about-content">
            <div>
              <h3>Our Story</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div>
              <img src="https://via.placeholder.com/500x300" alt="About Us" style="width: 100%; border-radius: 10px;">
            </div>
          </div>
        </div>
      </section>

      <section class="services">
        <div class="container">
          <h2>Our Services</h2>
          <div class="services-grid">
            <div class="service-card">
              <h3>Service 1</h3>
              <p>Description of your first service offering</p>
            </div>
            <div class="service-card">
              <h3>Service 2</h3>
              <p>Description of your second service offering</p>
            </div>
            <div class="service-card">
              <h3>Service 3</h3>
              <p>Description of your third service offering</p>
            </div>
          </div>
        </div>
      </section>

      <section class="contact" id="contact">
        <div class="container">
          <h2>Contact Us</h2>
          <form class="contact-form">
            <div class="form-group">
              <input type="text" placeholder="Your Name" required>
            </div>
            <div class="form-group">
              <input type="email" placeholder="Your Email" required>
            </div>
            <div class="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn" style="background: #667eea; color: white;">Send Message</button>
          </form>
        </div>
      </section>
    </body>
    </html>
  `;
}

function generateLandingPagePreview() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Landing Page Template Preview</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        .navbar { background: rgba(255,255,255,0.95); padding: 1rem 0; position: fixed; width: 100%; top: 0; z-index: 1000; backdrop-filter: blur(10px); }
        .nav-content { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5em; font-weight: bold; color: #667eea; }
        .nav-menu { display: flex; list-style: none; gap: 2rem; }
        .nav-menu a { text-decoration: none; color: #333; font-weight: 500; }
        
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 150px 0 100px; text-align: center; }
        .hero h1 { font-size: 3.5em; margin-bottom: 20px; }
        .hero p { font-size: 1.3em; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .btn { display: inline-block; background: #fff; color: #333; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; transition: all 0.3s; }
        .btn:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
        
        .features { padding: 100px 0; background: #f8f9fa; }
        .features h2 { text-align: center; font-size: 2.5em; margin-bottom: 60px; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; }
        .feature-card { background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; }
        .feature-icon { font-size: 3em; margin-bottom: 20px; }
        
        .portfolio { padding: 100px 0; }
        .portfolio h2 { text-align: center; font-size: 2.5em; margin-bottom: 60px; }
        .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .portfolio-item { position: relative; overflow: hidden; border-radius: 15px; }
        .portfolio-item img { width: 100%; height: 250px; object-fit: cover; transition: transform 0.3s; }
        .portfolio-item:hover img { transform: scale(1.1); }
        
        .testimonials { padding: 100px 0; background: #f8f9fa; }
        .testimonials h2 { text-align: center; font-size: 2.5em; margin-bottom: 60px; }
        .testimonial-card { background: white; padding: 40px; border-radius: 15px; margin-bottom: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
        
        @media (max-width: 768px) {
          .nav-menu { display: none; }
          .hero h1 { font-size: 2.5em; }
          .features-grid, .portfolio-grid { grid-template-columns: 1fr; }
        }
      </style>
    </head>
    <body>
      <nav class="navbar">
        <div class="container">
          <div class="nav-content">
            <div class="logo">Your Brand</div>
            <ul class="nav-menu">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <section class="hero" id="home">
        <div class="container">
          <h1>Welcome to Your Business</h1>
          <p>We create amazing experiences that help your business grow and succeed in the digital world</p>
          <a href="#contact" class="btn">Get Started Today</a>
        </div>
      </section>

      <section class="features" id="about">
        <div class="container">
          <h2>Why Choose Us</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3>Fast & Reliable</h3>
              <p>Lightning-fast websites that perform exceptionally well</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📱</div>
              <h3>Mobile Responsive</h3>
              <p>Perfect experience on all devices and screen sizes</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h3>Custom Design</h3>
              <p>Unique designs tailored to your brand and vision</p>
            </div>
          </div>
        </div>
      </section>

      <section class="portfolio" id="portfolio">
        <div class="container">
          <h2>Our Portfolio</h2>
          <div class="portfolio-grid">
            <div class="portfolio-item">
              <img src="https://via.placeholder.com/400x250" alt="Project 1">
            </div>
            <div class="portfolio-item">
              <img src="https://via.placeholder.com/400x250" alt="Project 2">
            </div>
            <div class="portfolio-item">
              <img src="https://via.placeholder.com/400x250" alt="Project 3">
            </div>
            <div class="portfolio-item">
              <img src="https://via.placeholder.com/400x250" alt="Project 4">
            </div>
          </div>
        </div>
      </section>

      <section class="testimonials">
        <div class="container">
          <h2>What Our Clients Say</h2>
          <div class="testimonial-card">
            <p>"Excellent service and amazing results. Our website looks professional and performs great!"</p>
            <strong>- John Doe, CEO</strong>
          </div>
          <div class="testimonial-card">
            <p>"Fast, reliable, and creative. They understood our vision perfectly."</p>
            <strong>- Jane Smith, Marketing Director</strong>
          </div>
        </div>
      </section>
    </body>
    </html>
  `;
}

function generateBlogPreview() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Blog Template Preview</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        .header { background: #fff; padding: 1rem 0; border-bottom: 1px solid #eee; }
        .header-content { display: flex; justify-content: space-between; align-items: center; }
        .blog-title { font-size: 2em; color: #2c3e50; }
        .nav-menu { display: flex; list-style: none; gap: 2rem; }
        .nav-menu a { text-decoration: none; color: #666; font-weight: 500; }
        
        .hero-blog { background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://via.placeholder.com/1200x400'); background-size: cover; background-position: center; color: white; padding: 100px 0; text-align: center; }
        .hero-blog h1 { font-size: 3em; margin-bottom: 20px; }
        .hero-blog p { font-size: 1.2em; max-width: 600px; margin: 0 auto; }
        
        .main-content { display: grid; grid-template-columns: 2fr 1fr; gap: 50px; padding: 60px 0; }
        .blog-posts { }
        .sidebar { }
        
        .post-card { background: white; margin-bottom: 40px; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .post-image { width: 100%; height: 200px; object-fit: cover; }
        .post-content { padding: 30px; }
        .post-title { font-size: 1.5em; margin-bottom: 10px; color: #2c3e50; }
        .post-meta { color: #666; font-size: 0.9em; margin-bottom: 15px; }
        .post-excerpt { color: #555; line-height: 1.8; }
        .read-more { color: #3498db; text-decoration: none; font-weight: bold; }
        
        .sidebar-widget { background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
        .widget-title { font-size: 1.2em; margin-bottom: 20px; color: #2c3e50; }
        .category-list { list-style: none; }
        .category-list li { padding: 8px 0; border-bottom: 1px solid #eee; }
        .category-list a { text-decoration: none; color: #666; }
        
        .recent-posts { }
        .recent-post { display: flex; gap: 15px; margin-bottom: 20px; }
        .recent-post-image { width: 60px; height: 60px; object-fit: cover; border-radius: 5px; }
        .recent-post-title { font-size: 0.9em; color: #2c3e50; text-decoration: none; }
        
        @media (max-width: 768px) {
          .main-content { grid-template-columns: 1fr; gap: 30px; }
          .hero-blog h1 { font-size: 2em; }
        }
      </style>
    </head>
    <body>
      <header class="header">
        <div class="container">
          <div class="header-content">
            <h1 class="blog-title">Your Blog</h1>
            <nav>
              <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#categories">Categories</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <section class="hero-blog">
        <div class="container">
          <h1>Welcome to Our Blog</h1>
          <p>Discover amazing content, insights, and stories that inspire and inform</p>
        </div>
      </section>

      <div class="container">
        <div class="main-content">
          <main class="blog-posts">
            <article class="post-card">
              <img src="https://via.placeholder.com/600x200" alt="Post 1" class="post-image">
              <div class="post-content">
                <h2 class="post-title">The Future of Web Development</h2>
                <div class="post-meta">Published on March 15, 2024 by John Doe</div>
                <p class="post-excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
                <a href="#" class="read-more">Read More →</a>
              </div>
            </article>

            <article class="post-card">
              <img src="https://via.placeholder.com/600x200" alt="Post 2" class="post-image">
              <div class="post-content">
                <h2 class="post-title">Best Practices for Modern Design</h2>
                <div class="post-meta">Published on March 10, 2024 by Jane Smith</div>
                <p class="post-excerpt">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat...</p>
                <a href="#" class="read-more">Read More →</a>
              </div>
            </article>

            <article class="post-card">
              <img src="https://via.placeholder.com/600x200" alt="Post 3" class="post-image">
              <div class="post-content">
                <h2 class="post-title">How to Optimize Your Website</h2>
                <div class="post-meta">Published on March 5, 2024 by Mike Johnson</div>
                <p class="post-excerpt">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam...</p>
                <a href="#" class="read-more">Read More →</a>
              </div>
            </article>
          </main>

          <aside class="sidebar">
            <div class="sidebar-widget">
              <h3 class="widget-title">Categories</h3>
              <ul class="category-list">
                <li><a href="#">Web Development</a></li>
                <li><a href="#">Design</a></li>
                <li><a href="#">Technology</a></li>
                <li><a href="#">Business</a></li>
                <li><a href="#">Tutorials</a></li>
              </ul>
            </div>

            <div class="sidebar-widget">
              <h3 class="widget-title">Recent Posts</h3>
              <div class="recent-posts">
                <div class="recent-post">
                  <img src="https://via.placeholder.com/60x60" alt="Recent 1" class="recent-post-image">
                  <a href="#" class="recent-post-title">Getting Started with React</a>
                </div>
                <div class="recent-post">
                  <img src="https://via.placeholder.com/60x60" alt="Recent 2" class="recent-post-image">
                  <a href="#" class="recent-post-title">CSS Grid vs Flexbox</a>
                </div>
                <div class="recent-post">
                  <img src="https://via.placeholder.com/60x60" alt="Recent 3" class="recent-post-image">
                  <a href="#" class="recent-post-title">JavaScript ES6 Features</a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateCustomSinglePage(blocks, colors, fonts) {
  // Implementation for customized single page based on user input
  return generateSinglePagePreview(); // Simplified for now
}

function generateCustomLandingPage(blocks, colors, fonts) {
  // Implementation for customized landing page based on user input
  return generateLandingPagePreview(); // Simplified for now
}

function generateCustomBlogPage(blocks, colors, fonts) {
  // Implementation for customized blog page based on user input
  return generateBlogPreview(); // Simplified for now
}

module.exports = router;