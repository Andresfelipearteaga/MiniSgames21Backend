import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
    },
    token: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Session", sessionSchema);