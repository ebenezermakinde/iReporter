const express = require('express');
const incident = require('../controller/IncidentController');

const router = express.Router();

router.get('/red-flags', incident.getAll);

router.get('/red-flags/:id', incident.getOne);

router.delete('/red-flags/:id', incident.remove);

router.post('/red-flags', incident.add);

router.patch('/red-flags/:id/comment', incident.updateComment);

router.patch('/red-flags/:id/location', incident.updateLocation);

module.exports = router;
