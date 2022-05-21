import express from "express";

import { login, signup, getadmin,updateProfile,getcurrentuser,forgotPassword, resetPassword, getProducts, getProduct, addProducts, deleteProduct } from "../controllers/admin.js";



const router = express.Router();

router.get('/',getadmin);
router.post('/login',login);
router.post('/signup',signup);
router.patch('/edit',updateProfile);
router.post('/forgotpassword',forgotPassword);
router.post('/resetpassword',resetPassword);
router.post('/getcurrentuser',getcurrentuser);
router.get('/getProducts',getProducts);
router.post('/addproducts',addProducts);
router.post('/getproduct', getProduct);
router.post('/deleteProduct', deleteProduct);
export default router;
