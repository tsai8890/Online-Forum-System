import mongoose from 'mongoose';
import {RatingSchema} from './Rating';

export const ReplySchema = new mongoose.Schema({
    UID: {
        type: String,
        required: [true, "UID in Reply is required"]
    },
    message: {
        type: String,
        required: [true, "message in Reply is required"]
    },
    rating: {
        type: RatingSchema,
        required: [true, "rating in Reply is required"]
    }
});