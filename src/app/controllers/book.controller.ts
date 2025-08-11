import { Request, Response } from "express";
import { Book } from "../models/book.model";
//create book
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create book",
      error: error.message,
    });
  }
};
//get all books
export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json({ success: true, data: books });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get books",
      error: error.message,
    });
  }
};
//get book by id
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, data: book });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get book",
      error: error.message,
    });
  }
};

//update book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Recalculate availability after update
    updatedBook.available = updatedBook.copies > 0;
    await updatedBook.save();

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
};

//delete book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
};
