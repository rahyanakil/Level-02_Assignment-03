import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI as string;

async function bootstrap() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

bootstrap();
