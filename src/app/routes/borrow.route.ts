import express from "express";
import { borrowController } from "../controllers/borrow.controller";

const router = express.Router();

router.post("/borrow", borrowController.borrowBook);
router.get("/borrow", borrowController.getBorrowedBooksSummary);

export default router;
