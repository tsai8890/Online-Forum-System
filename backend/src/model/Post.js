import mongoose from 'mongoose';
import Comment from './Comment';

export default Post = new mongoose.Schema({
    PID: {
        type: String,
        required: [true, "PID in Post is required"]
    },
    UID: {
        type: String,
        required: [true, "UID in Post is required"]
    },
    push: {
        type: Number,
        required: [true, "push in Post is required"]
    },
    content: {
        type: String,
        required: [true, "content in Post is required"]
    },
    comments: {
        type: [Comment],
        required: [true, "comments in Post is required"]
    }
});