import mongoose from 'mongoose';
import {RatingSchema} from './Rating';
import {ReplySchema} from './Reply';

export const CommentSchema = new mongoose.Schema({
    CID: {
        type: String,
        required: [true, "CID in Comment is required"]
    },
    UID: {
        type: String,
        required: [true, "UID in Comment is required"]
    },
    username: {
        type: String,
        required: [true, "username in Comment is required"]
    },
    nickname: {
        type: String,
        required: [true, "nickname in Comment is required"]
    },
    message: {
        type: String,
        required: [true, "message in Comment is required"]
    },
    replies: {
        type: [ReplySchema],
        required: [true, "replies in Comment is required"]
    },
    rating: {
        type: RatingSchema,
        required: [true, "rating in Comment is required"]
    },
    timestamp: {
        type: String,
        required: [true, "timestamp in Comment is required"]
    }
});