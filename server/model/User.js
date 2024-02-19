import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    userEmail: String,
    birthDate: String,
    studies: String,
    phoneNumber: String,
    hobbies: String,
    userId: String
});

export default model('User', userSchema);