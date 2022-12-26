import mongoose from 'mongoose';
import {CommentSchema} from './Comment';
import {RatingSchema} from './Rating';

export const PostSchema = new mongoose.Schema({
    PID: {
        type: String,
        required: [true, "PID in Post is required"]
    },
    UID: {
        type: String,
        required: [true, "UID in Post is required"]
    },
    rating: {
        type: RatingSchema,
        required: [true, "rating in Post is required"]
    },
    content: {
        type: String,
        required: [true, "content in Post is required"]
    },
    comments: {
        type: [CommentSchema],
        required: [true, "comments in Post is required"]
    }
});

const PostModel = mongoose.model("Post", PostSchema);
export default PostModel;