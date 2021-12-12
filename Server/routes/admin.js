import express from "express";

import { login, signup, userProfile,getadmin,updateProfile,getcurrentuser, forgotPassword, resetPassword } from "../controllers/admin.js";
import auth from "../midleware/auth.js";

const router = express.Router();

router.get('/',getadmin);
router.post('/login',login);
router.post('/signup',signup);
router.patch('/edit',updateProfile);
router.post('/forgotpassword',forgotPassword);
router.post('/resetpassword',resetPassword);
router.patch("/user-profile",auth, userProfile);
router.post('/getcurrentuser',getcurrentuser);
export default router;
