import express from 'express';
import newsRouter from './NewsRouter';

const prefix = "/api/v1";

const router = express.Router();

router.use( prefix + "/news", newsRouter);

export default router;