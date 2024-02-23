const asyncHandler = require('express-async-handler')
const Blog = require('../models/blogModels')
const User = require('../models/userModel')
const blogModels = require('../models/blogModels')


// Route : /api/blogs  
// Request : GET
// get blogs of specific user
const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({ user: req.user.id })
    res.status(200).json(blogs)
})

// Route : /api/blogs/all  
// Request : GET
// get blogs of all Users
const getallBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find()
    res.status(200).json(blogs)
})

// Route : /api/blogs 
// Request : POST
// add blog
const setBlog = asyncHandler(async (req, res) => {
    if (!req.body.title && !req.body.content) {
        res.status(400)
        throw new Error('Invalid Blog Details')
    }
    const blog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id
    })
    console.log(blog)
    res.status(200).json(blog)
})


// Route : /api/blogs/id
// Request : PUT
// update blog
const updateBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
        res.status(400)
        throw new Erroe('Blog not Found')
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User Not Found');
    }
    if (blog.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User Not Authorized');
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedBlog)
})

// Route : /api/blogs/id  
// Request : DELETE
// delete blog
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
        res.status(400)
        throw new Erroe('Blog not Found')
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User Not Found');
    }
    if (blog.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User Not Authorized');
    }

    await Blog.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getallBlogs,
    getBlogs, setBlog, updateBlog, deleteBlog
}