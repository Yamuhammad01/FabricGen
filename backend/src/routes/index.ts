import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import { HEALTH_PATH, API_PREFIX } from '../constants/index.js';

const router = Router();

router.use(HEALTH_PATH, healthRoutes);

// Future API v1 routes will be mounted here
// router.use(`${API_PREFIX}/fabric`, fabricRoutes);
// router.use(`${API_PREFIX}/generate`, generationRoutes);

export default router;