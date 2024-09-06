import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const questionSchema = new Schema(
  {
    // TODO: Define final structure of a question here
    questionText: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      enum: ['multiple-choice', 'short-answer', 'true-false', 'essay'],
      required: true,
    },
    options: [String], // For multiple-choice questions
    correctAnswer: String, // For validation, might be an array for multiple correct answers
  },
  { timestamps: true },
);

const testSchema = new Schema(
  {
    classroomId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Classroom',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    requirements: {
      type: String,
      default: '',
    },
    allowMultipleSubmissions: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    maxScore: {
      type: Number,
      required: true,
    },
    questions: [questionSchema],
  },
  { timestamps: true },
);

const Test = model('Test', testSchema);
export default Test;