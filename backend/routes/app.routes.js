import express from "express";
import { register, login, getProfile, updateProfile, logout, getRoles, getUsers } from "../controllers/users.controller.js";
import { newDriver, getDriver, searchDriver, updateDriver, loginDriver } from "../controllers/driver.controller.js"
import { userAuthWithCookie } from "../middlewares/users.middleware.js";
import { search } from "../controllers/search.controller.js";
const router = express.Router();

//routes for user
router.post('/register', userAuthWithCookie, register);
router.post('/login', login);
router.post('/logout', userAuthWithCookie, logout);
router.patch('/profile', userAuthWithCookie, updateProfile);
router.get('/profile', userAuthWithCookie, getProfile);
router.get('/users', userAuthWithCookie, getUsers );

//routes for driver
router.post('/driver', userAuthWithCookie, newDriver);
router.get('/driver/:id', userAuthWithCookie, getDriver);
router.get('/search-driver/:idDoc', userAuthWithCookie, searchDriver);
router.patch('/driver/:id', userAuthWithCookie, updateDriver);
router.post('/login-driver/', loginDriver);
router.post('/driver', userAuthWithCookie, newDriver);
router.get('/driver/:id', userAuthWithCookie, getDriver);
router.get('/search-driver/:idDoc', userAuthWithCookie, searchDriver);
router.patch('/driver/:id', userAuthWithCookie, updateDriver);

// routes for search
router.post('/search', userAuthWithCookie, search);

// routes for roles
router.get('/roles', userAuthWithCookie, getRoles);



export default router;

