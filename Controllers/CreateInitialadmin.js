const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

async function createInitialAdmin() {
    const adminEmail = process.env.adminEmail ;
    const adminPassword = process.env.adminPassword ;
    const adminrePassword = process.env.adminrePassword ;
    const Image = process.env.Image ;

  
    try {
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
          console.log('Admin user already exists.');
          return;
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const hashedrePassword = await bcrypt.hash(adminrePassword, 10);
        const admin = new User({
        firstName: 'Main',
        lastName: 'admin' ,
        email: adminEmail,
        image: Image ,
        password: hashedPassword,
        repassword: hashedrePassword,
        role: 'admin',
    });
  
      await admin.save();
    //   console.log('Admin user created');

    } catch (error) {
      console.error('Error creating admin user:', error);
    }
  }
  
module.exports = createInitialAdmin;