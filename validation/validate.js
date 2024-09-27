const { body, validationResult } = require('express-validator');
const User = require("../models/User");

const ValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateregister = [
  body('firstName').isString().withMessage('Name must be a string').notEmpty().withMessage("Name must be non-empty"),
  body('lastName').isString().withMessage('Name must be a string').notEmpty().withMessage("Name must be non-empty"),
  body('email').isEmail().withMessage("Email must be a valid email address"),
  body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body('repassword').isLength({ min: 6 }).withMessage("password is not match")
];

const validateLogin = [
  body("email").isEmail().withMessage('Email must be a valid email address'),
  body("password").notEmpty().withMessage('Password must be provided')
];

const validateQuestion = [
  body('type').isString().withMessage('Type must be a string').notEmpty()
  .withMessage('Type must be non-empty'),
  body('question').isString().withMessage('Question must be a string').notEmpty()
  .withMessage('Question must be non-empty'),
  body('correct_answer').isString().withMessage('Correct answer must be a string').notEmpty()
  .withMessage('Correct answer must be non-empty'),
  body('answers').isArray().withMessage('Incorrect answers must be an array of strings').notEmpty()
  .withMessage('Incorrect answers must not be empty'),
];

const validateEditquestion = [
  body('type').optional().isString().withMessage('Type must be a string if provided'),

  body('question').optional().isString().withMessage('Question must be a string if provided'),

  body('correct_answer').optional().isString().withMessage('Correct answer must be a string if provided'),

  body('answers').optional().isArray().withMessage('Incorrect answers must be an array if provided'),
];

const validateDeleteAllquestions = [
  body('password').isString().withMessage('Password must be a string').notEmpty()
  .withMessage('Password must be provided'),
];



module.exports = { ValidationErrors, validateregister, validateLogin , validateQuestion , validateEditquestion , validateDeleteAllquestions };
