import express from 'express';
import incident from './IncidentRoute';

const router = express.Router();

router.all('/api/v1/', (req, res) => res.json({ message: 'welcome to the API' }));
router.use('/api/v1/', incident);

export default router;
