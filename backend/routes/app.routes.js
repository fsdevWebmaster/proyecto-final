import express from "express";
import { register, login, profile } from "../controllers/users.controller.js";
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/profile', profile);

export default router;

