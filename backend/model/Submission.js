import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const answerSchema = new Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Question',
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const submissionSchema = new Schema(
  {
    testId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Test',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    answers: [answerSchema],
    score: {
      type: Number,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'finalized'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

const Submission = model('Submission', submissionSchema);
export default Submission;