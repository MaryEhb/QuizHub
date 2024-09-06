import mongoose from 'mongoose';

const connectToDatabase = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

export default connectToDatabase;