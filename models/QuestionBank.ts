import mongoose, { Schema } from 'mongoose';


const questionsSchema  = new mongoose.Schema({
    no: { type: String, required: true },
    text: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true },
    courseid: { type: String, required: true },
    topicid: { type: String, required: true }


});

export default mongoose.models.questionbanks || mongoose.model('questionbanks', questionsSchema);