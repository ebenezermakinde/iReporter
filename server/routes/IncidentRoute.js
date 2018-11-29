import express from 'express';
import incident from '../controller/IncidentController';

const router = express.Router();

router.get('/red-flags', incident.getAll);

router.get('/red-flags/:id', incident.getOne);

router.delete('/red-flags/:id', incident.remove);

router.post('/red-flags', incident.add);

router.patch('/red-flags/:id/comment', incident.updateComment);

export default router;
