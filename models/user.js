import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema({
    school: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ['admin', 'teacher', 'ta', 'student'], required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
})

const User = models.User || mongoose.model('User', userSchema);
export default User;