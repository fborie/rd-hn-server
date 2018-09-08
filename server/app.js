import express from 'express';
import router from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getNews, getNewsEveryHour } from './utils/api';

const db = mongoose.connect(
    'mongodb://reigndesign:qwerty.321@ds149742.mlab.com:49742/rd-hn-test-db',
    { 
        useNewUrlParser: true
    }
);

mongoose.connection.dropCollection('news').then( res => {
    console.log(' [news] collection dropped');
}).catch( err => {
    console.log(' [news] collection non existent');
})
mongoose.connection.dropCollection('deletednews').then( res => {
    console.log(' [deletednews] collection dropped');
}).catch( err => {
    console.log(' [deletednews] collection non existent');
});

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}

app.use(
    cors(corsOptions)
);

app.use(
	bodyParser.urlencoded({ extended: false })
);

app.use(bodyParser.json())

app.use('/', router);

getNews();
let timeout = getNewsEveryHour();

export default app;