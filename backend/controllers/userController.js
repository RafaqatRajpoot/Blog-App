const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
;
// Reguster A USer
// Route : /api/users  
// Request : POST
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields')
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name, email,
        password: hashedPassword,
    })
    console.log(user)

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        })
    }
    res.status(400)
    throw new Error('Invalid User Data');
})

// Athunticate A USer
// Route : /api/users/login  
// Request : POST
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please enter email and password')
    }
    const user = await User.findOne({ email });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (user && isPasswordMatch) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            taken: generateToken(user._id)
        })
    }

    res.status(400)
    throw new Error('Invalid User Credintals');
})


// GET A USer
// Route : /api/users/me  
// Request : GET
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json({
        id: _id, name, email
    })
})


// Generate Json Web Token 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d', })
}


module.exports =
{
    registerUser,
    loginUser, getMe
}