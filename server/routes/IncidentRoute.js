import express from 'express';
import incident from '../controller/IncidentController';
import middleware from '../helpers/middleware'; // to be refactored

const router = express.Router();

router.get('/red-flags', incident.getAll);

router.get('/red-flags/:id', incident.getOne);

router.delete('/red-flags/:id', incident.remove);

router.post('/red-flags', middleware.checkPost, middleware.checkRoute, incident.add);

router.patch('/red-flags/:id/comment', incident.updateComment);

router.patch('/red-flags/:id/location', incident.updateLocation);

router.get('/interventions', incident.getAll);

router.get('/interventions/:id', incident.getOne);

router.delete('/interventions/:id', incident.remove);

router.post('/interventions', middleware.checkPost, middleware.checkRoute, incident.add);

router.patch('/interventions/:id/comment', incident.updateComment);

router.patch('/interventions/:id/location', incident.updateLocation);

export default router;
