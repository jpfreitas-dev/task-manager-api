import express from 'express';
import { errorHandlingMiddleware } from '@/middlewares/error-handling.middleware';
import { routes } from '@/routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandlingMiddleware);

export default app;
