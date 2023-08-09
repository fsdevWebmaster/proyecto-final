import express from "express";
import { register, login, profile } from "../controllers/users.controller.js";
import { userAuth } from "../middlewares/users.middleware.js";
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/profile', userAuth, profile);

export default router;

