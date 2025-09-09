import { Router } from "express";
import { getMe, getUserById } from "../controllers/usersController.js";
import auth from "../middlewares/auth.js"

const userRouter = Router();

userRouter.get('/me', auth, getMe);

userRouter.get('/:id', getUserById);

export default userRouter;