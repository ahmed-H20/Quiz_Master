const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Question = require("../models/Questions");
const User = require("../models/User");
require('dotenv').config();

const getAllQuestions = async (req, res, next) => {
    try {
      const questions = await Question.find();
      res.status(200).json(questions); 
    } catch (error) {
      next(error);
    }
  };
  
  const addQuestion = async (req, res, next) => {
    const { type , question, correct_answer, answers } = req.body;
  
    try {
      const newQuestion = new Question({
        type,
        question,
        correct_answer,
        answers,
      });
      await newQuestion.save();
      res.status(201).json({ message: "Question added successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  const editQuestion = async (req, res, next) => {
    const { id } = req.params;
    const { type, question, correct_answer, answers } = req.body;
  
    try {
      const questionToUpdate = await Question.findById(id);
      if (!questionToUpdate) {
        return res.status(404).json({ error: "Question not found" });
      }
  
      questionToUpdate.type = type || questionToUpdate.type;
      questionToUpdate.question = question || questionToUpdate.question;
      questionToUpdate.correct_answer = correct_answer || questionToUpdate.correct_answer;
      questionToUpdate.answers = answers || questionToUpdate.answers;
  
      await questionToUpdate.save();
      res.json({ message: "Question updated successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  const deleteQuestion = async (req, res, next) => {
    try {
      const question = await Question.findByIdAndDelete(req.params.id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  const deleteAllQuestions = async (req, res, next) => {
    const { password } = req.body;
  
    try {
      const user = await User.findById(req.user._id); 
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ error: "Password incorrect" });
      }
  
      await Question.deleteMany({});
      res.status(200).json({ message: "All questions deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = { getAllQuestions , addQuestion , editQuestion , deleteQuestion , deleteAllQuestions };