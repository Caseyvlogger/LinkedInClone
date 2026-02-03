const httpStatus = require('http-status');
const postService = require('../services/post.service.cjs');

const createPost = async (req, res) => {
    const postData = {
        ...req.body,
        author: req.user.id,
    };

    const post = await postService.createPost(postData);
    res.status(httpStatus.CREATED).send(post);
}

const getFeed = async (req, res) => {
    res.send("Got Feed.")
};

module.exports = { getFeed, createPost };