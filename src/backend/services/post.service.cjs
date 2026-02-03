const Post = require('../models/post.model.cjs');

/**
 * Create a post
 * @param {Object} postBody
 * @returns {Promise<Post>}
 */
const createPost = async (postBody) => {
    return Post.create(postBody);
};

module.exports = {
    createPost,
};