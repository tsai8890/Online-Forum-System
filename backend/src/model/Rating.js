import mongoose from 'mongoose';

const RatingStatSchema = new mongoose.Schema({
    total: {
        type: Number,
        required: [true, "total in RatingStat is required"]
    },
    stat: {
        type: [String], // UID
        required: [true, "stat in RatingStat is required"]
    }
})

export const RatingSchema = new mongoose.Schema({
    push: {
        type: RatingStatSchema,
        required: [true, "push in Rating is required"]
    },
    down: {
        type: RatingStatSchema,
        required: [true, "down in Rating is required"]
    }
});