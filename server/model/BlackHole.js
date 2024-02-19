import mongoose from "mongoose";
const { Schema, model } = mongoose;

const quizQuestions = new Schema({
    kind: String,
    list: String,
    image: String,
    constellation: String,
    map: String,
    redshift: String,
    discovery: Object,
    wikipedia: String
});

export default model('BlackHole', quizQuestions);