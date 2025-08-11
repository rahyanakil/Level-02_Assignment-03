import { Document, Schema, model } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

interface BorrowDocument extends IBorrow, Document {}

const borrowSchema = new Schema<BorrowDocument>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Borrow quantity must be at least 1"],
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to validate book and quantity
borrowSchema.pre("save", async function (next) {
  const book = await Book.findById(this.book);
  if (!book) {
    return next(new Error("Book not found"));
  }
  if (book.copies < this.quantity) {
    return next(new Error("Not enough copies available"));
  }
  next();
});

export const Borrow = model<BorrowDocument>("Borrow", borrowSchema);
