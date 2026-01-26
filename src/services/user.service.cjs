const User = require('../models/user.model.cjs');

const createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

module.exports = { createUser };