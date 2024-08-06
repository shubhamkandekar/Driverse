import express from 'express';
import { createService } from '../controllers/serviceController.js';
import { validateService } from '../middlewares/validateMiddleware.js';

const router = express.Router();

router.post('/', validateService, createService);

export default router;
