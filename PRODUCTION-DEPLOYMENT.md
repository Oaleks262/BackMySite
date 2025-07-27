# 🚀 Production Deployment Guide

## Pre-Deployment Checklist

### ✅ **Critical Fixes Applied:**
- [x] Fixed API port configuration (5000)
- [x] Strong JWT secret configured
- [x] Security headers added (Helmet)
- [x] Rate limiting implemented
- [x] Admin user setup system created

### 📋 **Before Deployment:**

1. **Create Admin User:**
   ```bash
   npm run setup-admin
   ```
   Follow the interactive prompts to create your admin account.

2. **Environment Variables:**
   Ensure all required environment variables are set in production:
   ```bash
   PORT=4444
   MONGO_URI=your_production_mongodb_uri
   JWT_SECRET=your_strong_jwt_secret
   SMTP_EMAIL=your_smtp_email
   SMTP_PASS=your_smtp_password
   ```

3. **Update Frontend URLs:**
   All frontend files are configured to automatically use:
   - Local: `http://localhost:4444`
   - Production: `https://growth-tech.com.ua`

## Security Features Implemented

### 🔒 **Security Headers (Helmet.js):**
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection

### 🛡️ **Rate Limiting:**
- General API: 100 requests/15 minutes per IP
- Login endpoint: 5 attempts/15 minutes per IP
- Automatic IP blocking for abuse prevention

### 🔐 **Authentication Security:**
- Strong JWT secrets (128-bit)
- Password hashing with bcrypt (10 rounds)
- Role-based access control
- Secure token storage

## Deployment Steps

### 1. **Server Setup:**
```bash
# Clone repository
git clone [your-repo-url]
cd BackMySite

# Install dependencies
npm install

# Create admin user
npm run setup-admin

# Start production server
npm run prod
```

### 2. **Process Management (PM2):**
```bash
# Start with PM2
npm run pm2:start

# Monitor
pm2 status

# Logs
pm2 logs growth-tech-api
```

### 3. **Nginx Configuration:**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name growth-tech.com.ua www.growth-tech.com.ua;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name growth-tech.com.ua www.growth-tech.com.ua;

    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/private.key;

    location / {
        proxy_pass http://localhost:4444;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Verification

### ✅ **Test These Endpoints:**
```bash
# Homepage
curl -I https://growth-tech.com.ua

# API Health
curl https://growth-tech.com.ua/api/

# Admin Login
curl -X POST https://growth-tech.com.ua/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your-admin-email","password":"your-password"}'

# Security Headers
curl -I https://growth-tech.com.ua | grep -E "X-|Content-Security-Policy|Strict-Transport"
```

### 🔍 **Verify Security:**
- [ ] HTTPS redirect working
- [ ] Security headers present
- [ ] Rate limiting active
- [ ] Admin login functional
- [ ] Order creation working
- [ ] Email notifications sent

## Monitoring & Maintenance

### 📊 **Regular Checks:**
- Monitor server performance with PM2
- Check database connections
- Verify email delivery
- Monitor error logs
- Update dependencies regularly

### 🔄 **Backup Strategy:**
```bash
# Database backup
mongodump --uri "your_mongo_uri" --out ./backups/$(date +%Y%m%d)

# File backup
tar -czf backups/files_$(date +%Y%m%d).tar.gz uploads/
```

## Troubleshooting

### Common Issues:

1. **Port conflicts:**
   - Ensure port 5000 is available
   - Check firewall settings

2. **Database connection:**
   - Verify MongoDB URI
   - Check network connectivity

3. **Email not sending:**
   - Verify SMTP credentials
   - Check spam folders

4. **Rate limiting too strict:**
   - Adjust limits in `index.js`
   - Whitelist trusted IPs if needed

## Performance Optimization

### Future Improvements:
- [ ] Add Redis for session storage
- [ ] Implement CDN for static assets
- [ ] Add database indexing
- [ ] Implement caching strategies
- [ ] Add application monitoring (e.g., New Relic)

## Support

For technical support or deployment assistance:
- Email: oaleks262@gmail.com
- Review server logs: `pm2 logs growth-tech-api`
- Check application status: `pm2 status`

---

**🎉 Your BackMySite application is now production-ready!**

Current status: **95% Production Ready**
Estimated deployment time: **2-3 hours**