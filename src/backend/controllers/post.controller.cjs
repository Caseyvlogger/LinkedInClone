const httpStatus = require('http-status');
const { postService } = require('../services/index.cjs');

const createPost = async (req, res, next) => {
    try {
        const postData = {
            ...req.body,
            author: req.user.id,
        };

        const post = await postService.createPost(postData);
        res.status(httpStatus.status.CREATED).send(post);
    } catch (error) {
        next(error);
    }
};

const getFeed = async (req, res) => {
    res.send("Got Feed.");
};

module.exports = { getFeed, createPost };