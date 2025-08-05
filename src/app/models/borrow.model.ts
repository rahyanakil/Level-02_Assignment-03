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

//update book availability on borrow middleware

borrowSchema.post("save", async function (doc, next) {
  const book = await Book.findById(doc.book);
  if (book) {
    book.copies -= doc.quantity;
    if (book.copies < 0) {
      throw new Error("Not enough copies available");
    }
    await book.updateAvailability();
  }
  next();
});

export const Borrow = model<BorrowDocument>("Borrow", borrowSchema);
