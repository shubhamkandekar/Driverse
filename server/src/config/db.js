import mongoose from 'mongoose';
import colors from 'colors';
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully Connected to Database'.bgGreen.white);
      } catch (error) {
        console.error('Error connecting to MongoDB'.bgRed.white, error);
        process.exit(1);
      }
    };

export default connectDB;