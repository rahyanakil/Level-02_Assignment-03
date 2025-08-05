import mongoose = require("mongoose");
import { Document, Model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

interface BookDocument extends IBook, Document {
  updateAvailability(): Promise<void>;
}

interface BookModel extends Model<BookDocument> {
  updateAvailabilityStatic(bookId: string): Promise<void>;
}

const bookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: [
        "Fiction",
        "Non-Fiction",
        "Science",
        "History",
        "Fantasy",
        "Biography",
        "Mystery",
        "Romance",
      ],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.methods.updateAvailability = async function () {
  this.available = this.copies > 0;
  await this.save();
};

bookSchema.statics.updateAvailabilityStatic = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (book) {
    book.available = book.copies > 0;
    await book.save();
  }
};

bookSchema.pre("save", function (next) {
  console.log(`Book being saved: ${this.title}`);
  next();
});

export const Book = mongoose.model<BookDocument, BookModel>("Book", bookSchema);
