import express from 'express';
import { createLocation,getLocation } from '../controllers/location.js';

const router = express.Router();

router.get('/',getLocation);
router.post('/create-location',createLocation);

export default router;