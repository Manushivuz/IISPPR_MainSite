import { signUp, signIn } from '../controllers/authController.js';
import { Router } from 'express';

const router = Router();

router.post('/register', signUp);
router.post('/login', signIn);

export default router;