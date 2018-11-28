import express from 'express';
import incident from '../controller/IncidentController';

const router = express.Router();

router.get('/red-flags', incident.getAll);

export default router;
