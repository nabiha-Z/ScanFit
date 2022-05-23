import express from "express";

import { login, signup, getadmin,updateProfile,getcurrentuser,forgotPassword, resetPassword, getProducts, getProduct, addProducts, deleteProduct, gettOrders, editProduct } from "../controllers/admin.js";



const router = express.Router();

router.get('/',getadmin);
router.post('/login',login);
router.post('/signup',signup);
router.patch('/edit',updateProfile);
router.post('/forgotpassword',forgotPassword);
router.post('/resetpassword',resetPassword);
router.post('/getcurrentuser',getcurrentuser);
router.get('/getproducts',getProducts);
router.post('/addproducts',addProducts);
router.post('/getproduct', getProduct);
router.post('/deleteProduct', deleteProduct);
router.post('/editProduct', editProduct);
router.get('/getOrders',gettOrders);
export default router;
