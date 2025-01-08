import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = express.Router();

// Rota de registro de usuário (POST)
router.post('/register', registerUser);

// Rota de login do usuário (POST)
router.post('/login', loginUser);

export default router;
