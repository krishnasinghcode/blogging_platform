import express from 'express'
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog,getMyBlogs } from '../controllers/blogController.js';
import {authenticateUser} from '../middleware/auth.js'
const router = express.Router();

router.get('/myblogs', authenticateUser, getMyBlogs);
router.get('/',authenticateUser, getAllBlogs);
router.get('/:id',authenticateUser, getBlogById);
router.post('/create',authenticateUser, createBlog);
router.put('/:id',authenticateUser, updateBlog);
router.delete('/:id',authenticateUser, deleteBlog);

export default router