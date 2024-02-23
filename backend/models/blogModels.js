const mongoose = require('mongoose')


const blogSchema = (
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title:
        {
            type: String,
            required: [true, 'Please add Blog Title']
        },
        content:
        {
            type: String,
            required: [true, 'Please add details']
        },
    }
)
module.exports = mongoose.model('Blog', blogSchema)