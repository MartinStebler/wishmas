import express, { type Request, type Response, type NextFunction } from 'express';

export const app = express();

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'christmas-wishlist-api',
  });
});

app.use('/api', (_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Unknown API route',
  });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  });
});
