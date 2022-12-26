import mongoose from 'mongoose';

export default User = new mongoose.Schema({
    UID: {
        type: String,
        required: [true, "UID in User is required"]
    },
    username: {
        type: String,
        required: [true, "username in User is required"]
    },
    nickname: {
        type: String,
        required: [true, "nickname in User is required"]
    },
});