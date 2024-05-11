import express from 'express';
import routes from './routes';

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});