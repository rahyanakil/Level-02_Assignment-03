import { Document, Schema, model } from 'mongoose';
import type { IBorrow } from '../interfaces/borrow.interface.js';
import { Book } from './book.model.js';

interface BorrowDocument extends IBorrow, Document {}

const borrowSchema = new Schema<BorrowDocument>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Borrow quantity must be at least 1'],
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

borrowSchema.pre('save', async function (next) {
  const book = await Book.findById(this.book);
  if (!book) {
    return next(new Error('Book not found'));
  }
  next();
});

export const Borrow = model<BorrowDocument>('Borrow', borrowSchema);
