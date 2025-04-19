import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

router.get('/signup', (req, res) => {
    res.json({ message: "SIGNUP PAGE" });
});

router.post('/signup', signup);

router.get('/login', (req, res) => {
    res.json({ message: "LOGIN PAGE" });
});

router.post('/login', login);

export default router;
