const httpStatus = require('http-status');
const { postService } = require('../services/index.cjs');

const createPost = async (req, res, next) => {
    try {
        const postData = {
            ...req.body,
            author: req.user._id, // Using the user object attached by your auth middleware
        };

        const post = await postService.createPost(postData);

        // 201 Created
        res.status(httpStatus.CREATED).send(post);
    } catch (error) {
        // This sends the error to your global error handler (app.js)
        next(error);
    }
};

module.exports = {
    createPost,
};