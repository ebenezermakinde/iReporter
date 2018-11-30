import express from 'express';
import incident from '../controller/IncidentController';
import m from '../helpers/middleware'; // to be refactored

const router = express.Router();

router.get('/red-flags', incident.getAll);

router.get('/red-flags/:id', incident.getOne);

router.delete('/red-flags/:id', incident.remove);

router.post('/red-flags', m.checkIncidentFields, incident.add);

router.patch('/red-flags/:id/comment', incident.updateComment);

router.patch('/red-flags/:id/location', incident.updateLocation);

export default router;
