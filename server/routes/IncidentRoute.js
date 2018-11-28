import express from 'express';
import incident from '../controller/IncidentController';

const router = express.Router();

router.get('/red-flags', incident.getAll);

router.get('/red-flags/:id', incident.getOne);

export default router;
