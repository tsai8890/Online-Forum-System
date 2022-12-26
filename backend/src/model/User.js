import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    UID: {
        type: String,
        required: [true, "UID in User is required"]
    },
    username: {
        type: String,
        required: [true, "username in User is required"]
    },
    password: {
        type: String,
        required: [true, "password in User is required"]
    },
    nickname: {
        type: String,
        required: [true, "nickname in User is required"]
    },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;