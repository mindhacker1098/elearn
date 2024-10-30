import mongoose from 'mongoose';
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    army_no: {
        type: String,
        required: true
    },
    user: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    courseid: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.logins || mongoose.model('logins', userSchema);