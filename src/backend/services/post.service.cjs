const Post = require('../models/post.model.cjs');

const createPost = async (postBody) => {
    return Post.create(postBody);
};

module.exports = { createPost };