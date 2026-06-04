import express from 'express';

const app = express();

app.use(express.json());
// app.use(routes);
// app.use(errorHandler);

export default app;
