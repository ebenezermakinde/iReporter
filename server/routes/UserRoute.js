import express from 'express';
import user from '../controller/UserController';
import middleware from '../helpers/middleware';

const router = express.Router();
router.post('/auth/login', user.canLogin);
router.post('/auth/signup', user.canSignup);
router.patch('/red-flags/:id/status', middleware.checkAdmin, user.canEdit);
router.patch('/interventions/:id/status', middleware.checkAdmin, user.canEdit);

export default router;
