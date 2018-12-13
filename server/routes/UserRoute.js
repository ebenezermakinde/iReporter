import express from 'express';
import user from '../controller/UserController';

const router = express.Router();
router.post('/auth/login', user.canLogin);
router.post('/auth/signup', user.canSignup);
router.patch('/red-flags/:id/status', user.canEdit);
router.patch('/interventions/:id/status', user.canEdit);

export default router;
