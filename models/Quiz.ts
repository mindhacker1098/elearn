import mongoose, { Schema } from 'mongoose';


const questionsSchema  = new mongoose.Schema({
    no: { type: String, required: true },
    name: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true }
});


const quizSchema = new mongoose.Schema({
    questions: [questionsSchema],
    courseid: { type: String, required: true } 
});


export default mongoose.models.quizs || mongoose.model('quizs', quizSchema);
