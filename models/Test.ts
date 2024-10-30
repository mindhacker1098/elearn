import mongoose from 'mongoose';
const { Schema } = mongoose;


const testSchema = new mongoose.Schema({
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String },
    isFlexible: { type: Boolean, required: true },
    duration: { type: String },
    visibleInfo: { type: String, required: true },
    questionsPerMark: { type: Number, required: true },
    numberOfQuestions: { type: Number, required: true },
    description: { type: String },
    courseId: { type: String, required: true },
});


export default mongoose.models.tests || mongoose.model('tests', testSchema);