const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  type: { type: String, required: true },      
  question: { type: String, required: true },  
  correct_answer: { type: String, required: true },  
  answers: { type: Array, required: true },  
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
