import express from 'express';
import routes from './routes';
import cors from 'cors'; 
 
const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;

app.use(express.json());
 
app.use(cors({
  origin: 'http://localhost:3000'  // Only allow this origin to access your API
}));

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});