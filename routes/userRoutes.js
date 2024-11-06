import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile/:userId', getUserProfile);

export default router;
