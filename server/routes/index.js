import express from 'express';
import incident from './IncidentRoute';

const router = express.Router();

router.all('/', (req, res) => res.send('Welcome to iReporter'));
router.all('/api/v1/', (req, res) => res.json({ message: 'Welcome to iReporter API' }));
router.use('/api/v1/', incident);

export default router;
