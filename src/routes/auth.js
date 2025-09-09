import { Router } from "express";
import { body } from "express-validator";
import handleValidation from "../middlewares/validators.js";
import { login, register } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/register',
  body('username').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  handleValidation,
  register
);

authRouter.post('/login',
  body('email').isEmail(),
  body('password').exists(),
  handleValidation,
  login
);

export default authRouter;