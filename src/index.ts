import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const PORT = process.env.PORT || '3000';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use((req, res) => {
  res.send('hello world!!!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
