const express = require("express");
const auth = require("../middlewares/auth");
const { body } = require("express-validator");
const router = express.Router();
const {
    getAllQuestions ,
    addQuestion ,
    editQuestion ,
    deleteQuestion ,
    deleteAllQuestions ,
} = require("../Controllers/questionsController");
const {
  ValidationErrors,
  validateQuestion,
  validateEditquestion,
  validateDeleteAllquestions,
} = require("../validation/validate");


router.get("/getAllQuestions", getAllQuestions);

router.post(
  "/AddQuestion",
  auth(["admin"]),
  validateQuestion,
  ValidationErrors,
  addQuestion
);

router.patch(
  "/editQuestion/:id",
  auth(["admin"]),
  validateEditquestion,
  ValidationErrors,
  editQuestion
);

router.delete("/deleteQuestion/:id", auth(["admin"]), deleteQuestion);

router.delete("/deleteAllQuestions", auth(["admin"]) , validateDeleteAllquestions , ValidationErrors ,deleteAllQuestions);

module.exports = router;