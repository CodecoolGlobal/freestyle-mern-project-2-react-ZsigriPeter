import mongoose from "mongoose";
const { Schema, model } = mongoose;

const quizResultsSchema = new Schema({
    qiuzId: String,
    userId: String,
    userName: String,
    result: Number,
    percentage: Number,
});

export default model('QuizResults', quizResultsSchema);