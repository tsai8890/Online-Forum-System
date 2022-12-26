import mongoose from 'mongoose';

const RatingStat = new mongoose.Schema({
    total: {
        type: Number,
        required: [true, "total in RatingStat is required"]
    },
    stat: {
        type: Map,
        of: String, // UID
        required: [true, "stat in RatingStat is required"]
    }
})

export default Rating = new mongoose.Schema({
    push: {
        type: RatingStat,
        required: [true, "push in Rating is required"]
    },
    down: {
        type: RatingStat,
        required: [true, "down in Rating is required"]
    }
});