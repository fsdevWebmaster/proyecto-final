import express from "express";
import { register, login, getProfile, updateProfile, logout } from "../controllers/users.controller.js";
import {newDriver, getDriver, searchDriver, updateDriver,} from "../controllers/driver.controler.js"
import { userAuthWithCookie } from "../middlewares/users.middleware.js";
const router = express.Router();

//routes for user
router.post('/register', register);
router.post('/login', login);
router.post('/logout', userAuthWithCookie, logout);
router.get('/profile', userAuthWithCookie, getProfile);
router.patch('/profile', userAuthWithCookie, updateProfile);

//routes for driver
router.post('/driver', userAuthWithCookie, newDriver);
router.get('/driver/:id', userAuthWithCookie, getDriver);
router.get('/search-driver/:idDoc', userAuthWithCookie, searchDriver);
router.patch('/driver/:id', userAuthWithCookie, updateDriver);


export default router;

