import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const classroomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    enrollRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    leaderboard: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        name: {
          type: String,
        },
        score: {
          type: Number,
        },
      },
    ],
    tests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Test',
      },
    ],
    maxScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Classroom = model('Classroom', classroomSchema);
export default Classroom;