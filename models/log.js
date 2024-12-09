import mongoose, { models, Schema } from "mongoose";

const logSchema = new Schema({
    courseId: { type: String, required: true },
    school: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: Date, default: Date.now },
    text: { type: String, required: true },
})

const Log = models.Log || mongoose.model('Log', logSchema);
export default Log;