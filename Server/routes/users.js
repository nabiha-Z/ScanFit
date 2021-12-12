import express from 'express';
import {createListings} from '../controllers/listings.js';

import {getusers, login,loginuser,getmessages, updateList,unapprovedusers, signup,favList, fetchSaved,countSubusers,adduser,fetchsubuser,findSubuserslist,getuserdetails,fetchpropertydealers, deletesubuser,updatelimit,unfavList, decreaselimit, updateProfile, changePassword, forgotPassword, resetPassword, requestListing, sendMessage} from '../controllers/users.js';


const router = express.Router();
router.get('/',getusers);
router.get('/unapproved',unapprovedusers)
router.post('/createlist',createListings)
router.post('/signup',signup);
router.post('/adduser',adduser);
router.post('/login',login);
router.patch('/approval/:id',updateList);
router.post('/loginuser',loginuser);
router.post('/forgotpassword',forgotPassword);
router.post('/resetpassword',resetPassword);
router.patch('/favorite',favList);
router.post('/saved-lists',fetchSaved);
router.get('/propertydealers' ,fetchpropertydealers )
router.post('/subusersCount',countSubusers);
router.patch('/updateProfile',updateProfile);
router.patch('/changePassword',changePassword);
router.patch('/updatelimit/:id',updatelimit);
router.post('/subusersdata',findSubuserslist);
router.post('/companydetails',getuserdetails);
router.patch('/dec-limit',decreaselimit);
router.patch('/deletesubuser', deletesubuser);
router.post('/fetchsubuser',fetchsubuser);
router.get('/getmessages',getmessages)
router.patch('/unfavlisting',unfavList);
router.patch('/requestlisting',requestListing);
router.post('/send-message',sendMessage);



export default router;