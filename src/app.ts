import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import productsRoute from './routes/products.route';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get("/",(req, res) => {
  res.send('hello world!!!');
});

app.use("/products",productsRoute);

export default app;