import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    passwordSalt: {
      type: String,
      required: true,
    },
    profileScore: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', ''],
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    profilePicture: {
      type: String,
      default: '', // TODO: may handle profile pictures with a URL or use character generating
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    ownedClassrooms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Classroom',
      },
    ],
    enrolledClassrooms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Classroom',
      },
    ],
    recentClassrooms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Classroom',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    phoneNumber: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email', usernameLowerCase: true });

const User = model('User', userSchema);
export default User;