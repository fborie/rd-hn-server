import express from 'express';
import router from './routes';
import mongoose from 'mongoose';
import { getNews, getNewsEveryHour } from './utils/api';

const db = mongoose.connect(
    'mongodb://admin:qwerty.321@ds149742.mlab.com:49742/rd-hn-test-db',
    { 
        useNewUrlParser: true
    }
);

const app = express();

app.use('/', router);

getNews();
let timeout = getNewsEveryHour();

export default app;