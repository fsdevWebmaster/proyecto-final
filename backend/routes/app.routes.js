import express from "express";
import { register, login, getProfile, updateProfile } from "../controllers/users.controller.js";
import {newDriver, getDriver, searchDriver, updateDriver,} from "../controllers/driver.controler.js"
import { userAuth } from "../middlewares/users.middleware.js";
const router = express.Router();

//routes for user
router.post('/register', register);
router.post('/login', login);
router.get('/profile', userAuth, getProfile);
router.patch('/profile', userAuth, updateProfile);

//routes for driver
router.post('/driver', userAuth, newDriver);
router.get('/driver/:id', userAuth, getDriver);
router.get('/search-driver/:idDoc', userAuth, searchDriver);
router.patch('/driver/:id', userAuth, updateDriver);


export default router;

