import express from "express";
import { register, login, getProfile, updateProfile } from "../controllers/users.controller.js";
import { userAuth } from "../middlewares/users.middleware.js";
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/profile', userAuth, getProfile);
router.patch('/profile', userAuth, updateProfile);

export default router;

