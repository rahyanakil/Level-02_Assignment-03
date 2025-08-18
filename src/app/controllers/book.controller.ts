import type { Request, Response } from 'express';
import { Book } from '../models/book.model.js';

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json({ success: true, data: book });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create book',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.find();
    return res.json({ success: true, data: books });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get books',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: 'Book not found' });
    }
    return res.json({ success: true, data: book });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get book',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: 'Book not found' });
    }

    updatedBook.available = updatedBook.copies > 0;
    await updatedBook.save();

    return res
      .status(200)
      .json({
        success: true,
        message: 'Book updated successfully',
        data: updatedBook,
      });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update book',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res
        .status(404)
        .json({ success: false, message: 'Book not found' });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: 'Book deleted successfully',
        data: null,
      });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete book',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
