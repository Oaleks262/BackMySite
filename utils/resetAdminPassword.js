const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

async function resetAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Find admin user
    const admin = await User.findOne({ email: 'oaleks262@gmail.com' });
    if (!admin) {
      console.log('Admin not found');
      process.exit(1);
    }
    
    // Update password and role
    admin.password = await bcrypt.hash('admin123456', 10);
    admin.role = 'admin';
    await admin.save();
    
    console.log('Admin password reset successfully!');
    console.log('Email:', admin.email);
    console.log('New Password: admin123456');
    console.log('Role:', admin.role);
    
    process.exit(0);
  } catch (error) {
    console.error('Error resetting admin password:', error);
    process.exit(1);
  }
}

resetAdminPassword();