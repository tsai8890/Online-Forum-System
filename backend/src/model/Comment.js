import mongoose from 'mongoose';
import Reply from './Reply';

export default Comment = new mongoose.Schema({
    CID: {
        type: String,
        required: [true, "CID in Comment is required"]
    },
    UID: {
        type: String,
        required: [true, "UID in Comment is required"]
    },
    messages: {
        type: [String],
        required: [true, "messages in Comment is required"]
    },
    replies: {
        type: [Reply],
        required: [true, "replies in Comment is required"]
    },
    push: {
        type: Number,
        required: [true, "push in Comment is required"]
    },
    down: {
        type: Number,
        required
    }
});