import express from 'express';
import incident from '../controller/IncidentController';

const router = express.Router();

router.get('/red-flags', incident.getAll);

router.get('/red-flags/:id', incident.getOne);

router.delete('/red-flags/:id', incident.remove);

export default router;
