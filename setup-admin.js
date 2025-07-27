#!/usr/bin/env node

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');
const User = require('./models/User');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function askPassword(question) {
  return new Promise((resolve) => {
    process.stdout.write(question);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    let password = '';
    
    process.stdin.on('data', function(char) {
      char = char.toString();
      
      switch (char) {
        case '\n':
        case '\r':
        case '\u0004':
          process.stdin.setRawMode(false);
          process.stdin.pause();
          console.log('');
          resolve(password);
          break;
        case '\u0003':
          process.exit();
          break;
        case '\u007f': // backspace
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b');
          }
          break;
        default:
          password += char;
          process.stdout.write('*');
          break;
      }
    });
  });
}

async function createAdminUser() {
  try {
    console.log('🔧 Growth-tech Admin Setup Tool\n');
    
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists:');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Name: ${existingAdmin.firstName} ${existingAdmin.lastName}\n`);
      
      const overwrite = await askQuestion('Do you want to create another admin? (y/N): ');
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('❌ Setup cancelled');
        process.exit(0);
      }
    }
    
    // Get admin details
    console.log('👤 Enter admin user details:\n');
    
    const firstName = await askQuestion('First Name: ');
    const lastName = await askQuestion('Last Name: ');
    const email = await askQuestion('Email: ');
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format');
      process.exit(1);
    }
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User with this email already exists');
      process.exit(1);
    }
    
    const phone = await askQuestion('Phone (optional): ');
    
    // Get password with confirmation
    let password, confirmPassword;
    do {
      password = await askPassword('Password (min 8 characters): ');
      
      if (password.length < 8) {
        console.log('❌ Password must be at least 8 characters long\n');
        continue;
      }
      
      confirmPassword = await askPassword('Confirm Password: ');
      
      if (password !== confirmPassword) {
        console.log('❌ Passwords do not match\n');
      }
    } while (password !== confirmPassword || password.length < 8);
    
    // Hash password
    console.log('\n🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin user
    console.log('👤 Creating admin user...');
    const adminUser = new User({
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      password: hashedPassword,
      role: 'admin'
    });
    
    await adminUser.save();
    
    console.log('\n✅ Admin user created successfully!');
    console.log(`   Email: ${email}`);
    console.log(`   Name: ${firstName} ${lastName}`);
    console.log(`   Role: admin\n`);
    
    console.log('🎉 You can now login to the admin panel with these credentials.');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  } finally {
    rl.close();
    mongoose.connection.close();
  }
}

// Handle exit gracefully
process.on('SIGINT', () => {
  console.log('\n👋 Setup cancelled');
  process.exit(0);
});

// Run the setup
createAdminUser();