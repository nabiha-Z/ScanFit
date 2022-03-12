import express from 'express';

import {getusers, login,loginuser,signup,favList, updateProfile, changePassword, forgotPassword, resetPassword, fetchMeasurements, deleteMeasurements, editMeasurements } from '../controllers/users.js';


const router = express.Router();
router.get('/',getusers);
router.post('/signup',signup);
router.post('/login',login);
router.post('/loginuser',loginuser);
router.post('/forgotpassword',forgotPassword);
router.post('/resetpassword',resetPassword);
router.patch('/favorite',favList);  
router.post('/deleteMeassurements', deleteMeasurements);
router.patch('/editMeasurements', editMeasurements);
router.post('/getMeassurements', fetchMeasurements);
router.patch('/updateProfile',updateProfile);
router.patch('/changePassword',changePassword);

export default router;