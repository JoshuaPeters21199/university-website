import mongoose, { models, Schema } from "mongoose";

const courseSchema = new Schema({
    id: { type: String, required: true },
    display: { type: String, required: true },
    school: { type: String, required: true },
    teacher: { type: String, required: true },
    ta: { type: String, required: true },
})

const Course = models.Course || mongoose.model('Course', courseSchema);
export default Course;