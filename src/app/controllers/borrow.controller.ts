import { Request, Response } from "express";
import { Book } from "../models/book.model";

export const borrowController = {
  borrowBook: async (req: Request, res: Response) => {
    try {
      const { bookId } = req.body;

      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      if (book.copies < 1) {
        return res.status(400).json({
          success: false,
          message: "No copies available to borrow",
        });
      }

      book.copies -= 1;
      await book.save();
      await book.updateAvailability?.();

      res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
        data: book,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to borrow book",
        error,
      });
    }
  },

  getBorrowSummary: async (req: Request, res: Response) => {
    try {
      const books = await Book.find({ copies: { $lt: 5 } }); // example filter
      res.status(200).json({
        success: true,
        message: "Borrow summary retrieved successfully",
        data: books,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get borrow summary",
        error,
      });
    }
  },
};
