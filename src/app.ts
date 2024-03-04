import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import errorHandling from './middlewares/errorHandling';
import verifyToken from './middlewares/verifyToken';
import loggerMiddleware from './middlewares/apiLogger';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use(loggerMiddleware);

app.use(verifyToken);

app.use('/', routes);
app.use(errorHandling);

export default app;