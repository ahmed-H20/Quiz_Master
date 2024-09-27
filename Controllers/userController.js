const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
require('dotenv').config();

const register = async (req, res ,next) => {
    const { firstName, lastName ,email, password, repassword } = req.body;
    const image =  req.file;
    // console.log(req.file);
    
    // Multer handles the uploaded file here
    // await image.uploadimage()
    if (!image) {
      return res.status(400).send("No image uploaded");
  
    }
    
    try {
      if (password !== repassword) {
          return res.status(400).json('Passwords do not match.');
      }

      const saltRounds = 10;  
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const hashedrePassword = await bcrypt.hash(repassword, saltRounds);

      const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json('Email is already registered.');
        }

        // Ensure password uniqueness (limited to current implementation)
        const passwordUsedBefore = await User.findOne({
            password: hashedPassword
        });

        if (passwordUsedBefore) {
            return res.status(400).json('This password has been used before. Please choose a new one.');
        }

         // Get image file path from multer
         const imagePath = image ? image.path : null;

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            image: imagePath,
            password: hashedPassword,
            repassword: hashedrePassword
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

 const checkEmail = async (req, res) => {
  try {
      const { email } = req.body;
      
      // Check if the email exists in the database
      const user = await User.findOne({ email });

      if (user) {
          res.json({ isUnique: false });
      } else {
          res.json({ isUnique: true });
      }
  } catch (error) {
      console.error('Error checking email uniqueness:', error);
      res.status(500).json({ message: 'Server error' });
  }
};



const getAllUser = async (req, res ,next) => {
    try {
      const user = await User.find();
      res.status(201).json(user);
    } catch (error) {
      //res.status(500).json({ error: 'Server error' });
      next(error);
    }
  };

const getUserbyemail = async (req , res , next) =>{
  const { email } = req.query; 

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }

      res.json(user);
  } catch (error) {
      console.error('Error retrieving user by email:', error);
      next(error);
  }

};

const login = async (req, res ,next) => {
    const {email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email." });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid password." });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {expiresIn: '1h'});

      // , {expiresIn: '1h'}

      // console.log(token);
      // console.log(user._id);

      res.status(201).json(token);
    } catch (error) {
      //res.status(500).json({ error: 'Server error' });
      next(error);
    }
  };


  
  
  module.exports = { register , getAllUser , login , checkEmail , getUserbyemail }
  
