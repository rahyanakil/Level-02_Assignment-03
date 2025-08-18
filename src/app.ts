import cors from 'cors';
import express, {
  type Application,
  type Request,
  type Response,
} from 'express';

import bookRoutes from './app/routes/book.route.js';
import borrowRoutes from './app/routes/borrow.route.js';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/', borrowRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Library management system is running');
});

export default app;
