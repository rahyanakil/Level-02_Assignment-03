import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI as string;

async function bootstrap() {
  try {
    await mongoose.connect(
      "mongodb+srv://rahyanlibrary:rahyanlibrary@cluster0.upxd80l.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(` Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

bootstrap();
