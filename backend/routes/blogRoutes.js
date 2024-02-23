const express = require('express')
const router = express.Router()

const { getallBlogs, getBlogs, setBlog, updateBlog, deleteBlog } = require('../controllers/blogControllers')
const { protect } = require('../middleWares/authMiddleWare')

router.route('/').get(protect, getBlogs).post(protect, setBlog)
router.route('/').get(protect, getBlogs).post(protect, setBlog)
router.route('/all').get(protect, getallBlogs)

router.route('/:id').put(protect, updateBlog).delete(protect, deleteBlog)

module.exports = router