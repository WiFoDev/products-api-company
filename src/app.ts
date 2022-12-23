import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import productsRoute from './routes/products.route';
import authRoute from './routes/auth.route';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('hello world!!!');
});

app.use('/products', productsRoute);
app.use('/auth', authRoute);

export default app;
