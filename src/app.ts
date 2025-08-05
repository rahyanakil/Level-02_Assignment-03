import cors from "cors";
import express, { Application, Request, Response } from "express";
import bookRoutes from "./app/routes/book.route";
import borrowRoutes from "./app/routes/borrow.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send(`Library management system is running`);
});

export default app;
