import express from "express";
import dotenv from "dotenv";
import meetingRouter from "./routes/meeting";
import { AppError } from './utils/AppError';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();
app.use(express.json());

app.use("/process-meeting", meetingRouter);

// 404 handler for unmatched routes
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Error-handling middleware
const errorHandler: express.ErrorRequestHandler = (err, req, res, _next) => {
  // Log error details
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}: ${err.message}`);

  // If custom AppError, use its status and message
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ status: 'error', message: err.message });
    return;
  }

  // Otherwise, generic 500
  res.status(500).json({ status: 'error', message: 'An unexpected error occurred.' });
  return;
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});