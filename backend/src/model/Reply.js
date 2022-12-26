import mongoose from 'mongoose';

export default Reply = new mongoose.Schema({
    UID: {
        type: String,
        required: [true, "UID in Reply is required"]
    },
    messgae: {
        type: String,
        required: [true, "message in Reply is required"]
    },
    push: {
        type: Number,
        required: [true, "push in Reply is required"]
    },
});