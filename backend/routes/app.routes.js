import express from "express";
import { 
  register, 
  login, 
  profile, 
  newDriver, 
  getDriver, 
  searchDriver,
  updateDriver 
} from "../controllers/users.controller.js";
import { userAuth } from "../middlewares/users.middleware.js";
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/profile', userAuth, profile);

router.post('/driver', userAuth, newDriver);
router.get('/driver/:id', userAuth, getDriver);
router.get('/search-driver/:idDoc', userAuth, searchDriver);
router.patch('/driver/:id', userAuth, updateDriver);



export default router;

