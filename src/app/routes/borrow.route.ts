import express from 'express';
import { borrowController } from '../controllers/borrow.controller.js';

const router = express.Router();

router.post('/borrow', borrowController.borrowBook);
router.get('/borrow', borrowController.getBorrowedBooksSummary);

export default router;
