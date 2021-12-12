import express from 'express';
import { createCategory,getCategory} from '../controllers/categories.js';

const router = express.Router();

router.get('/',getCategory);
router.post('/create-category',createCategory);

export default router;