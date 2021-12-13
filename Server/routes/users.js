import express from 'express';

import {getusers, login,loginuser,getmessages, updateList,unapprovedusers, signup,favList, fetchSaved,countSubusers,adduser,fetchsubuser,findSubuserslist,getuserdetails,fetchpropertydealers, deletesubuser,updatelimit,unfavList, decreaselimit, updateProfile, changePassword, forgotPassword, resetPassword, requestListing, sendMessage} from '../controllers/users.js';


const router = express.Router();
router.get('/',getusers);
router.post('/signup',signup);
router.post('/login',login);
router.patch('/approval/:id',updateList);
router.post('/loginuser',loginuser);
router.post('/forgotpassword',forgotPassword);
router.post('/resetpassword',resetPassword);
router.patch('/favorite',favList);
router.post('/saved-lists',fetchSaved);
router.patch('/updateProfile',updateProfile);
router.patch('/changePassword',changePassword);



export default router;