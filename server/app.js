import express from 'express';
import router from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import { getNews, getNewsEveryHour } from './utils/api';

const db = mongoose.connect(
    'mongodb://admin:qwerty.321@ds149742.mlab.com:49742/rd-hn-test-db',
    { 
        useNewUrlParser: true
    }
);

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

app.use('/', router);

getNews();
let timeout = getNewsEveryHour();

export default app;