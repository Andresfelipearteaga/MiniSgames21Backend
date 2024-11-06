import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    activityNumber : {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    activityInfo : {
        type: Object,
        default: {}
    },
});

export default mongoose.model('Activity', activitySchema);
