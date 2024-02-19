import mongoose from "mongoose";
const { Schema, model } = mongoose;

const quizQuestions = new Schema({
    question: String,
    options: Array,
    answer: String,
});

export default model('QuizQuestions', quizQuestions);