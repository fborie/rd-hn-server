import express from 'express';
import NewsController from '../controllers/NewsController';

const newsController = new NewsController();

const newsRouter = express.Router();

newsRouter.get('/', newsController.getAll );
newsRouter.post('/mockdb', newsController.mockdb );
newsRouter.delete('/removeAll', newsController.removeAll );

export default newsRouter;