import express from 'express'
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import {authenticateUser} from '../middleware/authentication.js'
const router = express.Router();

router.get('/',authenticateUser, getBlogs);
router.get('/:id',authenticateUser, getBlogById);
router.post('/create',authenticateUser, createBlog);
router.put('/:id',authenticateUser, updateBlog);
router.delete('/:id',authenticateUser, deleteBlog);

export default router