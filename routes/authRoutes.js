import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import  { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login, protect);
router.get('/protect', protect);
router.post('/logout', logout);

export default router;
