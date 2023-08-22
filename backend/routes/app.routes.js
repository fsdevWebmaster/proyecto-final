import express from "express";
import { 
  register, 
  login, 
  getProfile,
  updateProfile,
  newDriver, 
  getDriver, 
  searchDriver,
  updateDriver,
  getProfile, 
  updateProfile
} from "../controllers/users.controller.js";
import { userAuth } from "../middlewares/users.middleware.js";
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', userAuth, getProfile);
router.patch('/profile', userAuth, updateProfile);

router.post('/driver', userAuth, newDriver);
router.get('/driver/:id', userAuth, getDriver);
router.get('/search-driver/:idDoc', userAuth, searchDriver);
router.patch('/driver/:id', userAuth, updateDriver);


export default router;

