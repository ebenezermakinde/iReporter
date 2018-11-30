const express = require('express');
const incident = require('./IncidentRoute');

const router = express.Router();

router.all('/api/v1/', (req, res) => res.json({ message: 'welcome to the API' }));
router.use('/api/v1/', incident);

module.exports = router;
