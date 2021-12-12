import express from 'express';
import { createProject, getProjects } from '../controllers/projects.js';

const router = express.Router();

router.post('/createProject',createProject);
router.get('/',getProjects);

export default router;
