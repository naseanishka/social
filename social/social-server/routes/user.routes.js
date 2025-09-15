import express from "express";
import isAuth from "../Middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/user.controllers.js";

const userRouter = express.Router();
// validate the user, before moving forward
// middle is middleware

// userRouter.get('/current', isAuth, getToApp)
userRouter.get('/current', isAuth, getCurrentUser)

export default userRouter;