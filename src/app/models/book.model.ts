import mongoose, { Document, Model, Schema } from 'mongoose';
import type { IBook } from '../interfaces/book.interface.js';

interface BookDocument extends IBook, Document {
  updateAvailability(): Promise<void>;
}

interface BookModel extends Model<BookDocument> {}

const bookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: [
        'FICTION',
        'NON-FICTION',
        'SCIENCE',
        'HISTORY',
        'FANTASY',
        'BIOGRAPHY',
        'MYSTERY',
        'ROMANCE',
      ],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, 'Copies must be a positive number'],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (
        _doc,
        ret: Partial<BookDocument> & { _id: any; __v?: any }
      ) => {
        if (ret._id) ret._id = ret._id.toString();
        if (ret.__v !== undefined) delete ret.__v;
        return ret;
      },
    },
  }
);

bookSchema.methods.updateAvailability = async function () {
  this.available = this.copies > 0;
  await this.save();
};

bookSchema.pre('save', function (next) {
  console.log(`Book being saved: ${this.title}`);
  next();
});

export const Book = mongoose.model<BookDocument, BookModel>('Book', bookSchema);
