import mongoose, { Schema } from 'mongoose';


const topicSchema  = new mongoose.Schema({
    fileName: { type: String, required: true },
    type: { type: String, required: true },
    src: { type: String, required: true },
    no: { type: String, required: true }
});


const subTopicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    data: [topicSchema] 
});


const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    topics: [subTopicSchema] 
});





export default mongoose.models.courses || mongoose.model('courses', courseSchema);
