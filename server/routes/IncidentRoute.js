import express from 'express';
import incident from '../controller/IncidentController';
import middleware from '../helpers/middleware'; // to be refactored

const router = express.Router();

router.get('/red-flags', middleware.verifyToken, incident.getAll);

router.get('/red-flags/:id', middleware.verifyToken, incident.getOne);

router.delete('/red-flags/:id', middleware.verifyToken, incident.remove);

router.post('/red-flags', middleware.verifyToken, middleware.checkPost, middleware.checkRoute, incident.add);

router.patch('/red-flags/:id/comment', middleware.verifyToken, incident.updateComment);

router.patch('/red-flags/:id/location', middleware.verifyToken, incident.updateLocation);

router.get('/interventions', middleware.verifyToken, incident.getAll);

router.get('/interventions/:id', middleware.verifyToken, incident.getOne);

router.delete('/interventions/:id', middleware.verifyToken, incident.remove);

router.post('/interventions', middleware.verifyToken, middleware.checkPost, middleware.checkRoute, incident.add);

router.patch('/interventions/:id/comment', middleware.verifyToken, incident.updateComment);

router.patch('/interventions/:id/location', middleware.verifyToken, incident.updateLocation);

export default router;
