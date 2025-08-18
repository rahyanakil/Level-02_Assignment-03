import type { Request, Response } from 'express';
import { Book } from '../models/book.model.js';
import { Borrow } from '../models/borrow.model.js';

export const borrowController = {
  borrowBook: async (req: Request, res: Response) => {
    try {
      const { book: bookId, quantity, dueDate } = req.body;

      const book = await Book.findById(bookId);
      if (!book) {
        return res
          .status(404)
          .json({ success: false, message: 'Book not found' });
      }

      if (book.copies < quantity) {
        return res
          .status(400)
          .json({ success: false, message: 'Not enough copies available' });
      }

      book.copies -= quantity;
      book.available = book.copies > 0;
      await book.save();

      const borrowRecord = await Borrow.create({
        book: book._id,
        quantity,
        dueDate,
      });

      return res
        .status(200)
        .json({
          success: true,
          message: 'Book borrowed successfully',
          data: borrowRecord,
        });
    } catch (error: unknown) {
      return res
        .status(500)
        .json({
          success: false,
          message: 'Failed to borrow book',
          error: error instanceof Error ? error.message : String(error),
        });
    }
  },

  getBorrowedBooksSummary: async (_req: Request, res: Response) => {
    try {
      const summary = await Borrow.aggregate([
        {
          $lookup: {
            from: 'books',
            localField: 'book',
            foreignField: '_id',
            as: 'bookDetails',
          },
        },
        { $unwind: '$bookDetails' },
        {
          $group: {
            _id: '$bookDetails._id',
            book: {
              $first: {
                title: '$bookDetails.title',
                isbn: '$bookDetails.isbn',
              },
            },
            totalQuantity: { $sum: '$quantity' },
          },
        },
        { $project: { _id: 0, book: 1, totalQuantity: 1 } },
      ]);

      return res
        .status(200)
        .json({
          success: true,
          message: 'Borrowed books summary retrieved successfully',
          data: summary,
        });
    } catch (error: unknown) {
      return res
        .status(500)
        .json({
          success: false,
          message: 'Failed to retrieve borrowed books summary',
          error: error instanceof Error ? error.message : String(error),
        });
    }
  },
};
