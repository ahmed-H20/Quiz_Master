const express = require("express");
const upload = require("../middlewares/upload");
const { body } = require("express-validator");
const router = express.Router();
const {
  register,
  getAllUser,
  login,
  checkEmail,
  getUserbyemail,
} = require("../Controllers/userController");
const {
  ValidationErrors,
  validateregister,
  validateLogin,
} = require("../validation/validate");
const auth = require("../middlewares/auth");
const path = require("path");

router.post("/register", upload.single('image') , validateregister, ValidationErrors, register);

router.post('/check-email', checkEmail);

router.get('/by-email', getUserbyemail)

router.get( "/", getAllUser );

router.post("/login", validateLogin , ValidationErrors, login);

module.exports = router;
