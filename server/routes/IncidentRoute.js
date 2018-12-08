import express from 'express';
import incident from '../controller/IncidentController';
import checkFields from '../helpers/middleware'; // to be refactored

const router = express.Router();

router.get('/red-flags', incident.getAll);

router.get('/red-flags/:id', incident.getOne);

router.delete('/red-flags/:id', incident.remove);

router.post('/red-flags', checkFields, incident.add);

router.patch('/red-flags/:id/comment', incident.updateComment);

router.patch('/red-flags/:id/location', incident.updateLocation);

router.get('/intervention', incident.getAll);

// router.get('/intervention/:id', incident.getOne);

// router.delete('/intervention/:id', incident.remove);

// router.post('/intervention', checkFields, incident.add);

// router.patch('/intervention/:id/comment', incident.updateComment);

// router.patch('/intervention/:id/location', incident.updateLocation);

export default router;
