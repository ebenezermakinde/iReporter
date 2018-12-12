import express from 'express';
import user from '../controller/UserController';

const router = express.Router();
router.post('/auth/signup', user.canSignup);

export default router;
